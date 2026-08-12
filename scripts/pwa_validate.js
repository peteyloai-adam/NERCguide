#!/usr/bin/env node
'use strict';
const fs=require('fs'), path=require('path'), vm=require('vm');
const root=path.resolve(__dirname,'..');
let pass=0,fail=0;
function check(cond,msg){if(cond){console.log('PASS ',msg);pass++;}else{console.error('FAIL ',msg);fail++;}}
function read(rel){return fs.readFileSync(path.join(root,rel),'utf8');}

const html=read('index.html');
const manifest=JSON.parse(read('manifest.webmanifest'));
const cacheManifest=JSON.parse(read('pwa-cache-manifest.json'));
check(/rel="manifest" href="manifest\.webmanifest"/.test(html),'index links the PWA manifest with a relative URL');
check(/apple-touch-icon/.test(html),'index exposes an Apple touch icon');
check(/apple-mobile-web-app-capable/.test(html),'index includes iPad standalone metadata');
check(/src="pwa\.js"/.test(html)&&/src="js\/app\.js"/.test(html),'PWA registration and application engine are both loaded');
check(manifest.start_url==='./'&&manifest.scope==='./','manifest start URL and scope are GitHub Pages subpath-safe');
check(manifest.display==='standalone','manifest launches as a standalone web app');
check(Array.isArray(manifest.icons)&&manifest.icons.some(i=>i.sizes==='192x192')&&manifest.icons.some(i=>i.sizes==='512x512')&&manifest.icons.some(i=>i.purpose==='maskable'),'manifest includes 192, 512, and maskable icons');
for(const icon of manifest.icons) check(fs.existsSync(path.join(root,icon.src)),`manifest icon exists: ${icon.src}`);
check(fs.existsSync(path.join(root,'icons/apple-touch-icon.png')),'Apple touch icon file exists');
check(fs.existsSync(path.join(root,'.nojekyll')),'GitHub Pages .nojekyll marker exists');
check(cacheManifest.assets.length>=50,'offline cache contains the full local runtime asset set');
check(cacheManifest.assets.every(a=>a.startsWith('./')&&!/^\.\/https?:/i.test(a)),'all precache entries are relative URLs');
let missing=[]; for(const a of cacheManifest.assets){if(a==='./')continue; const rel=a.replace(/^\.\//,''); if(!fs.existsSync(path.join(root,rel)))missing.push(rel);} check(missing.length===0,'every precached runtime file exists'+(missing.length?': '+missing.join(', '):''));
check(cacheManifest.assets.includes('./index.html')&&cacheManifest.assets.includes('./css/console.css')&&cacheManifest.assets.includes('./js/app.js')&&cacheManifest.assets.includes('./pwa.js'),'cache includes core shell, engine, CSS, and PWA registration');

// Load service worker in a small mocked environment and exercise install + offline fallback.
const handlers={};
const stores=new Map();
const base='https://example.test/study/';
function norm(req){let v=typeof req==='string'?req:req.url; if(v.startsWith('./'))v=new URL(v,base).href; return v;}
class MockCache{
  constructor(){this.map=new Map();}
  async addAll(list){for(const item of list){const key=norm(item);let body='cached '+item;if(item==='./index.html'||item==='./')body=read('index.html');this.map.set(key,new Response(body,{status:200}));}}
  async keys(){return [...this.map.keys()].map(u=>({url:u}));}
  async match(req){const r=this.map.get(norm(req));return r?r.clone():undefined;}
  async put(req,res){this.map.set(norm(req),res.clone());}
}
const cachesMock={
  async open(name){if(!stores.has(name))stores.set(name,new MockCache());return stores.get(name);},
  async keys(){return [...stores.keys()];},
  async delete(name){return stores.delete(name);},
  async match(req){for(const c of stores.values()){const r=await c.match(req);if(r)return r;}},
};
const clientMessages=[];
const selfMock={
  location:{origin:'https://example.test',href:base+'sw.js'},
  addEventListener:(t,fn)=>{handlers[t]=fn;},
  clients:{claim:async()=>{},matchAll:async()=>[{postMessage:m=>clientMessages.push(m)}]},
  skipWaiting:()=>Promise.resolve()
};
let online=true;
async function fetchMock(req){if(!online)throw new Error('offline');return new Response('network '+norm(req),{status:200});}
const context={self:selfMock,caches:cachesMock,fetch:fetchMock,Response,Request,URL,console};
vm.createContext(context);vm.runInContext(read('sw.js'),context,{filename:'sw.js'});
check(typeof handlers.install==='function'&&typeof handlers.activate==='function'&&typeof handlers.fetch==='function'&&typeof handlers.message==='function','service worker registers install, activate, fetch, and message handlers');
(async()=>{
  let installPromise;handlers.install({waitUntil:p=>{installPromise=p;}});await installPromise;
  const names=await cachesMock.keys();const c=await cachesMock.open(names[0]);const keys=await c.keys();
  check(keys.length===cacheManifest.assetCount,'service worker install precaches the declared asset count');
  let activatePromise;handlers.activate({waitUntil:p=>{activatePromise=p;}});await activatePromise;
  check(clientMessages.some(m=>m.type==='OFFLINE_READY'),'service worker announces offline readiness after activation');
  online=false;
  let navPromise;handlers.fetch({request:{method:'GET',url:base,mode:'navigate'},respondWith:p=>{navPromise=p;}});const nav=await navPromise;
  const navText=await nav.text();check(nav.status===200&&navText.includes('NERC System Operator Study Console'),'offline navigation falls back to cached index');
  let staticPromise;handlers.fetch({request:{method:'GET',url:base+'css/console.css',mode:'same-origin'},respondWith:p=>{staticPromise=p;}});const staticResp=await staticPromise;
  check(staticResp&&staticResp.status===200,'offline static asset request is served from cache');
  console.log(`\n${pass} PWA checks passed; ${fail} failed.`);process.exitCode=fail?1:0;
})().catch(e=>{console.error(e);process.exit(1);});
