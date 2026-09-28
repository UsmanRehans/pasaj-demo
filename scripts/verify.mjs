import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve('public');
const report=JSON.parse(fs.readFileSync('docs/capture-report.json','utf8'));
const missing=[];
for(const route of report.pages){
 const file=path.join(root,route,'index.html');
 if(!fs.existsSync(file)){missing.push(file);continue;}
 const text=fs.readFileSync(file,'utf8');
 for(const match of text.matchAll(/\/assets\/[^\s"'<>\\)]+/g)){
  if(!fs.existsSync(path.join(root,match[0]))) missing.push(match[0]);
 }
 if(!text.includes('/replica.js')) missing.push(route+': runtime');
}
for(const f of ['replica.js','replica.css','catalog.json'])if(!fs.existsSync(path.join(root,f)))missing.push(f);
if(report.failures.length || missing.length){console.error({failures:report.failures,missing:[...new Set(missing)]});process.exit(1);}
const products=JSON.parse(fs.readFileSync(path.join(root,'catalog.json'))).products;
console.log(`Verified ${report.pages.length} captured pages, ${report.asset_count - (report.source_unavailable?.length || 0)} local assets (${report.source_unavailable?.length || 0} documented source gaps), ${products.length} products.`);

// Product-specific media additions must remain deployable after source refreshes.
const filmPage=fs.readFileSync(path.join(root,'products/nourishing-natural-face-oil/index.html'),'utf8');
if(filmPage.includes('id="pasaj-product-film"')){
 for(const file of ['video/nourishing-face-oil-ritual.mp4','video/nourishing-face-oil-ritual.jpg','product-film.js','product-film.css']){
  if(!fs.existsSync(path.join(root,file))||!fs.statSync(path.join(root,file)).size){throw new Error(`Missing product film asset: ${file}`);}
 }
 if((filmPage.match(/id="pasaj-product-film"/g)||[]).length!==1)throw new Error('Duplicate product film section');
 console.log('Verified product film markup and media assets.');
}
