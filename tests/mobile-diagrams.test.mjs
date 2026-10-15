import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFileSync } from 'node:fs';
const base = new URL('../', import.meta.url);
function logic(width, gate, a, b) {
  const els = new Map();
  const el = id => {
    if (!els.has(id)) els.set(id, { value: '', checked: false, style: {}, dataset: {}, attrs: {}, innerHTML: '', textContent: '', addEventListener() {}, setAttribute(k,v) { this.attrs[k]=v; }, removeAttribute(k) { delete this.attrs[k]; } });
    return els.get(id);
  };
  el('#logic-gate').value=gate; el('#logic-a').checked=a; el('#logic-b').checked=b;
  const root={querySelector:el};
  const window={innerWidth:width, Theme:{}, matchMedia:()=>({matches:width<=620}), addEventListener(){}};
  const document={getElementById:()=>root,documentElement:{getAttribute:()=> 'en'},addEventListener(){}};
  vm.runInNewContext(readFileSync(new URL('js/logic-gates.js',base),'utf8'),{window,document});
  return {svg:el('#logic-svg'),out:el('#logic-out')};
}
test('logic gates remain correct with a vertical phone layout and full desktop diagram',()=>{
 for (const [gate, expected] of [['AND',0],['OR',1],['NOT',0],['NAND',1],['NOR',0],['XOR',1]]) {
   const mobile=logic(390,gate,true,false);
   assert.equal(Number(mobile.out.textContent),expected);
   const [, ,w,h]=mobile.svg.attrs.viewBox.split(' ').map(Number);
   assert.ok(h>w,`${gate} must render top to bottom on a phone`);
   assert.ok(w<=280,`${gate} diagram must fit narrow padded frame`);
   assert.equal(mobile.svg.dataset.mobileLayout,'vertical');
   assert.equal(logic(1280,gate,true,false).svg.attrs.viewBox,'0 0 500 220');
 }
});
test('four-variable Karnaugh groups have separate legend rows inside the SVG',()=>{
 const els=new Map();
 const el=id=>{
  if(!els.has(id)) els.set(id,{value:'4',checked:true,attrs:{},events:{},innerHTML:'',style:{setProperty(){}},setAttribute(k,v){this.attrs[k]=v;},querySelectorAll(){return [];},addEventListener(k,fn){this.events[k]=fn;}});
  return els.get(id);
 };
 let n=0;
 const MathStub=Object.create(Math); MathStub.random=()=>[0,5,10,15].includes(n++%16)?0.1:0.9;
 const document={getElementById:()=>({querySelector:el}),documentElement:{getAttribute:()=> 'en'},addEventListener(){}};
 const source=process.env.KMAP_SOURCE || new URL('js/karnaugh.js',base);
 vm.runInNewContext(readFileSync(source,'utf8'),{document,window:{Theme:{}},Math:MathStub});
 el('#kmap-random').events.click();
 const svg=el('#kmap-svg');
 const height=Number(svg.attrs.viewBox.split(' ')[3]);
 const legend=[...svg.innerHTML.matchAll(/<text x="92" y="(\d+)"[^>]*>([^<]+)<\/text>/g)];
 assert.equal(legend.length,4,'isolated minterms produce four distinct groups');
 assert.equal(new Set(legend.map(x=>x[1])).size,4,'legend groups must not overlap');
 assert.ok(legend.every(x=>Number(x[1])+5<height),'all legend rows fit viewBox');
 const fonts=[...svg.innerHTML.matchAll(/font-size="(\d+)"/g)].map(x=>Number(x[1]));
 assert.ok(Math.min(...fonts)>=11,'grid and minterm labels meet readable size at 1:1');
});
test('sequential pipeline total does not overlap the last cycle tick row',()=>{
 const els=new Map();const el=id=>{
  if(!els.has(id))els.set(id,{attrs:{},innerHTML:'',style:{},setAttribute(k,v){this.attrs[k]=v;},addEventListener(){}});
  return els.get(id);
 };
 const document={getElementById:()=>({querySelector:el}),documentElement:{getAttribute:()=> 'en'},addEventListener(){}};
 const source=process.env.PIPE_SOURCE || new URL('js/pipelining.js',base);
 vm.runInNewContext(readFileSync(source,'utf8'),{document,window:{Theme:{}}});
 const texts=[...el('#pipe-svg').innerHTML.matchAll(/<text[^>]* y="([\d.]+)"[^>]*>([^<]*)<\/text>/g)];
 const total=texts.find(x=>x[2].includes('25 total'));
 const tick=texts.find(x=>x[2]==='14');
 assert.ok(total && tick,'sequential diagram includes cycle 14 and total 25');
 assert.ok(Math.abs(Number(total[1])-Number(tick[1]))>=14,'ellipsis belongs to a separate label row');
});
