import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve('public');
const types = {'.html':'text/html','.css':'text/css','.js':'text/javascript','.json':'application/json','.jpg':'image/jpeg','.jpeg':'image/jpeg','.png':'image/png','.svg':'image/svg+xml','.webp':'image/webp','.woff2':'font/woff2','.mp4':'video/mp4'};
http.createServer((req,res) => {
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url,'http://localhost').pathname); } catch {res.writeHead(400).end();return;}
  if (pathname === '/cart') pathname = '/';
  let file = path.resolve(root,'.'+pathname);
  if (!file.startsWith(root+path.sep) && file !== root) {res.writeHead(403).end();return;}
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file=path.join(file,'index.html');
  if (!fs.existsSync(file)) {res.writeHead(404,{'Content-Type':'text/plain'}).end('Page not found');return;}
  res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream'});
  fs.createReadStream(file).pipe(res);
}).listen(4173,'127.0.0.1',()=>console.log('PASAJ preview: http://localhost:4173'));
