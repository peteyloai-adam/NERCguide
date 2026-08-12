#!/usr/bin/env python3
"""Regenerate the PWA service-worker precache after changing local course files."""
from __future__ import annotations
import argparse, json
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]

def runtime_assets():
    assets=['./','./index.html','./manifest.webmanifest','./pwa.js','./css/console.css']
    assets += ['./'+p.relative_to(ROOT).as_posix() for p in sorted((ROOT/'js').rglob('*.js'))]
    assets += ['./'+p.relative_to(ROOT).as_posix() for p in sorted((ROOT/'icons').glob('*.png'))]
    out=[]; seen=set()
    for a in assets:
        if a not in seen: seen.add(a); out.append(a)
    return out

def service_worker(cache_name, assets):
    return f'''const CACHE_NAME = {json.dumps(cache_name)};
const APP_SHELL = {json.dumps(assets, indent=2)};

self.addEventListener('install', event => {{
  event.waitUntil((async () => {{
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(APP_SHELL);
  }})());
}});

self.addEventListener('activate', event => {{
  event.waitUntil((async () => {{
    const names = await caches.keys();
    await Promise.all(names.filter(name => name.startsWith('nerc-study-console-') && name !== CACHE_NAME).map(name => caches.delete(name)));
    await self.clients.claim();
    const clients = await self.clients.matchAll({{ type: 'window', includeUncontrolled: true }});
    clients.forEach(client => client.postMessage({{ type: 'OFFLINE_READY' }}));
  }})());
}});

self.addEventListener('message', event => {{
  const data = event.data || {{}};
  if (data.type === 'SKIP_WAITING') self.skipWaiting();
  if (data.type === 'CACHE_STATUS') {{
    event.waitUntil((async () => {{
      const cache = await caches.open(CACHE_NAME);
      const keys = await cache.keys();
      const payload = {{ type: 'CACHE_STATUS', ready: keys.length >= APP_SHELL.length, cached: keys.length, expected: APP_SHELL.length, cache: CACHE_NAME }};
      if (event.source && event.source.postMessage) event.source.postMessage(payload);
      else {{ const clients = await self.clients.matchAll({{ type: 'window', includeUncontrolled: true }}); clients.forEach(client => client.postMessage(payload)); }}
    }})());
  }}
}});

self.addEventListener('fetch', event => {{
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {{
    event.respondWith((async () => {{
      try {{
        const fresh = await fetch(request);
        const cache = await caches.open(CACHE_NAME);
        cache.put('./index.html', fresh.clone()).catch(() => {{}});
        return fresh;
      }} catch (err) {{
        const cache = await caches.open(CACHE_NAME);
        return (await cache.match('./index.html')) || (await cache.match('./'));
      }}
    }})());
    return;
  }}

  event.respondWith((async () => {{
    const cached = await caches.match(request);
    if (cached) return cached;
    try {{
      const response = await fetch(request);
      if (response && response.ok) {{ const cache = await caches.open(CACHE_NAME); cache.put(request, response.clone()).catch(() => {{}}); }}
      return response;
    }} catch (err) {{
      return new Response('Offline and this resource was not cached.', {{ status: 503, headers: {{ 'Content-Type': 'text/plain; charset=utf-8' }} }});
    }}
  }})());
}});
'''

def main():
    ap=argparse.ArgumentParser()
    ap.add_argument('--cache-version',required=True,help='Example: pwa2 or 2026-08-15')
    args=ap.parse_args()
    assets=runtime_assets()
    cache_name=f'nerc-study-console-v3.2.0-remediated-{args.cache_version}'
    (ROOT/'sw.js').write_text(service_worker(cache_name,assets))
    (ROOT/'pwa-cache-manifest.json').write_text(json.dumps({'cacheName':cache_name,'assetCount':len(assets),'assets':assets},indent=2)+'\n')
    print(f'Wrote sw.js with {len(assets)} runtime assets and cache {cache_name}')
if __name__=='__main__': main()
