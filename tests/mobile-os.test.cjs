const fs = require('node:fs');
const assert = require('node:assert/strict');
const {test} = require('node:test');
const root=require('node:path').resolve(__dirname,'..')+'/';
for(const file of ['a1-3-os.html','.foma-port/pages/a1-3-os.html']) test(file+' contains a readable vertical loop and unchanged desktop geometry',()=>{
 const src=fs.readFileSync(root+file,'utf8');
 const svg=src.match(/<svg class="loop-mobile"[\s\S]*?<\/svg>/)?.[0];
 assert.ok(svg,'mobile diagram exists');
 assert.match(svg,/viewBox="0 0 280 710"/);
 const fonts=[...svg.matchAll(/font-size="(\d+)"/g)].map(m=>Number(m[1]));
 assert.ok(fonts.length>=12 && fonts.every(n=>n>=12));
 assert.equal((svg.match(/<rect /g)||[]).length,8);
 assert.match(svg,/M200 610 H258 V470 H200/,'feedback rejoins controller');
 assert.match(src,/<svg class="loop-desktop" viewBox="0 0 600 220"/);
 assert.match(src,/@media \(max-width: 620px\)/);
});
