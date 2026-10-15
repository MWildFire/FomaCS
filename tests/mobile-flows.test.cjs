const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
function boot(file) {
  const ids = new Map();
  class Element {
    constructor(tag = 'div') { this.tagName = tag; this.attrs = {}; this.children = []; this.listeners = {}; this.style = {}; this.value = 'sigmoid'; this.options = [{text:'Sigmoid'}]; this.selectedIndex = 0; }
    setAttribute(k,v) { this.attrs[k] = String(v); }
    getAttribute(k) { return this.attrs[k]; }
    removeAttribute(k) { delete this.attrs[k]; }
    addEventListener(k,fn) { this.listeners[k] = fn; }
    appendChild(el) { this.children.push(el); el.parentNode = this; }
    removeChild(el) { this.children.splice(this.children.indexOf(el),1); }
    get firstChild() { return this.children[0]; }
    querySelector(s) { return get(s.replace('#','')); }
    getBoundingClientRect() { return { width:280, height:100, left:0, top:0 }; }
  }
  function get(id) { if (!ids.has(id)) ids.set(id,new Element()); return ids.get(id); }
  const doc = new Element(); doc.documentElement = new Element(); doc.documentElement.setAttribute('data-lang','en');
  doc.getElementById = get; doc.createElementNS = (_,tag)=>new Element(tag); doc.createElement = tag=>new Element(tag); doc.body = new Element();
  const win = new Element(); win.innerWidth = 390; win.innerHeight = 844; win.Theme = new Proxy({}, {get:()=> '#555'});
  vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../js',file),'utf8'), {document:doc,window:win,setInterval:()=>1,clearInterval(){},setTimeout:()=>1,clearTimeout(){},console});
  return { get,win,doc };
}
for (const [file,id] of [['fetch-execute.js','fde-svg'],['layers.js','layers-svg'],['neural-net.js','nn-svg']]) {
  test(file+' uses vertical narrow canvas and restores desktop on resize',()=> {
    const {get,win} = boot(file), svg = get(id);
    assert.equal(svg.getAttribute('data-mobile-layout'),'vertical');
    assert.equal(Number(svg.getAttribute('viewBox').split(' ')[2]),280);
    const texts = [];
    function visit(n) { if(n.tagName==='text') texts.push(Number(n.attrs['font-size'])); n.children.forEach(visit); }
    visit(svg);
    for(const match of (svg.innerHTML || '').matchAll(/font-size="([\d.]+)"/g)) texts.push(Number(match[1]));
    assert.ok(texts.length > 10);
    assert.ok(texts.every(x=>x>=12),'all mobile labels >=12 in 280-unit canvas');
    win.innerWidth = 1280; win.listeners.resize();
    assert.equal(svg.getAttribute('data-mobile-layout'),undefined);
    assert.ok(Number(svg.getAttribute('viewBox').split(' ')[2])>=800);
  });
}
test('CPU keeps instruction and accumulator across mobile/desktop resize', () => {
  const {get,win} = boot('fetch-execute.js');
  for(let i=0;i<3;i++) get('fde-step').listeners.click();
  const note = get('fde-note').innerHTML;
  assert.match(note,/literal 5 into AC/);
  win.innerWidth = 1280; win.listeners.resize();
  win.innerWidth = 390; win.listeners.resize();
  assert.equal(get('fde-note').innerHTML,note);
  assert.match(get('fde-svg').innerHTML,/LOAD 5/);
  get('fde-step').listeners.click(); // ready
  get('fde-step').listeners.click(); // fetch second instruction, not reset to first
  assert.match(get('fde-note').innerHTML,/PC = 1/);
});
test('neural inputs and predictions survive a resize', () => {
  const {get,win} = boot('neural-net.js');
  get('nn-input-1').value = '0.25';
  get('nn-input-1').listeners.input();
  const result = get('nn-prediction').textContent;
  win.innerWidth = 1280; win.listeners.resize();
  win.innerWidth = 390; win.listeners.resize();
  assert.equal(get('nn-input-1').value,'0.25');
  assert.equal(get('nn-prediction').textContent,result);
});
