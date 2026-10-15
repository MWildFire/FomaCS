const {test}=require('node:test');
const assert=require('node:assert/strict');
const vm=require('node:vm');
const fs=require('node:fs');
const path=require('node:path');
function harness(file,id){
 const nodes=new Map(); const events={};
 class El {constructor(){this.attrs={};this.children=[];this.dataset={};this.style={};this.listeners={};this.value='';this.innerHTML='';} setAttribute(k,v){this.attrs[k]=String(v);}getAttribute(k){return this.attrs[k];}appendChild(e){this.children.push(e);return e;}removeChild(e){this.children.splice(this.children.indexOf(e),1);}get firstChild(){return this.children[0];}addEventListener(k,fn){this.listeners[k]=fn;}querySelector(s){return get(s.slice(1));}querySelectorAll(selector){if(selector!=='.cache-ram-hit')return [];if(this.parsedHtml!==this.innerHTML){this.parsedHtml=this.innerHTML;this.ramCells=Array.from(this.innerHTML.matchAll(/class="cache-ram-hit" data-addr="(\d+)"/g),m=>{const e=new El();e.setAttribute('data-addr',m[1]);return e;});}return this.ramCells;} }
 function get(id){if(!nodes.has(id))nodes.set(id,new El());return nodes.get(id);}
 get('cache-size').value='16';get('cache-policy').value='lru';get('cache-pattern').value='sequential';get('ddos-attackers').value='50';get('ddos-defense').value='waf';
 const document={getElementById:get,createElementNS:()=>new El(),documentElement:new El(),addEventListener(){}};
 const window={innerWidth:390,Theme:new Proxy({}, {get:()=> '#123456'}),matchMedia:()=>({matches:false}),addEventListener:(k,fn)=>events[k]=fn};
 vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../js',file),'utf8'),{window,document,setInterval:()=>1,clearInterval(){},requestAnimationFrame:()=>1,cancelAnimationFrame(){}});
 return {svg:get(id),get,window,events};
}
for(const [file,id] of [['erd.js','erd-svg'],['cache-sim.js','cache-svg'],['ddos.js','ddos-svg']])test(file+' has readable narrow layout and restores desktop',()=>{
 const h=harness(file,id);assert.equal(h.svg.dataset.mobileLayout,'vertical');assert.equal(h.svg.attrs.viewBox.split(' ')[2],'280');
 function checkText(el){if(el.attrs['font-size'])assert.ok(Number(el.attrs['font-size'])>=12);el.children.forEach(checkText);}checkText(h.svg);
 for(const m of h.svg.innerHTML.matchAll(/font-size="([\d.]+)"/g))assert.ok(Number(m[1])>=12);
 assert.equal(typeof h.events.resize,'function');h.window.innerWidth=1200;h.events.resize();assert.equal(h.svg.dataset.mobileLayout,undefined);assert.ok(Number(h.svg.attrs.viewBox.split(' ')[2])>=800);
});
test('ERD resolver and cache access preserve state through resize',()=>{
 const e=harness('erd.js','erd-svg');e.get('erd-toggle').listeners.click();assert.ok(e.svg.children.some(g=>g.children.some(n=>n.textContent==='ENROLMENT')));e.events.resize();assert.equal(e.get('erd-toggle').disabled,true);
 const c=harness('cache-sim.js','cache-svg');assert.equal((c.svg.innerHTML.match(/class="cache-ram-hit"/g)||[]).length,32);c.get('cache-step').listeners.click();assert.equal(c.get('cache-misses').textContent,1);c.events.resize();assert.equal(c.get('cache-misses').textContent,1);assert.ok(c.svg.innerHTML.includes('[15]'));c.svg.querySelectorAll('.cache-ram-hit')[31].listeners.click();assert.equal(c.get('cache-misses').textContent,2);assert.ok(c.svg.innerHTML.includes('0x1F'));c.svg.querySelectorAll('.cache-ram-hit')[31].listeners.click();assert.equal(c.get('cache-hits').textContent,1);assert.ok(Number(c.svg.attrs.viewBox.split(' ')[3])>800);
});

test('DDoS supports 100 attackers inside the mobile canvas',()=>{
 const h=harness('ddos.js','ddos-svg');h.get('ddos-attackers').value='100';h.get('ddos-attackers').listeners.input();
 const height=Number(h.svg.attrs.viewBox.split(' ')[3]);
 for(const n of h.svg.children){for(const key of ['x','x1','x2','cx'])if(n.attrs[key]!==undefined)assert.ok(Number(n.attrs[key])>=0&&Number(n.attrs[key])<=280);for(const key of ['y','y1','y2','cy'])if(n.attrs[key]!==undefined)assert.ok(Number(n.attrs[key])>=0&&Number(n.attrs[key])<height);}
 assert.equal(h.svg.children.filter(n=>n.textContent==='☠').length,100);
});
