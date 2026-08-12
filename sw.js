const CACHE_NAME = "nerc-study-console-v3.2.0-remediated-pwa1";
const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./pwa.js",
  "./css/console.css",
  "./js/app.js",
  "./js/data.blueprint.js",
  "./js/data.content.js",
  "./js/data.glossary.js",
  "./js/data.phase2.js",
  "./js/data.phase3.js",
  "./js/data.questions.js",
  "./js/data.release.js",
  "./js/data.remediation.js",
  "./js/data.standards.js",
  "./js/data.stdcards.js",
  "./js/data.videos.js",
  "./js/interactives/aceCalc.js",
  "./js/interactives/aceLoop.js",
  "./js/interactives/agcModes.js",
  "./js/interactives/authorityMap.js",
  "./js/interactives/badDataLab.js",
  "./js/interactives/coldLoadPickup.js",
  "./js/interactives/commsSimulator.js",
  "./js/interactives/contingencyFlow.js",
  "./js/interactives/emergencyTabletop.js",
  "./js/interactives/equipmentPrimer.js",
  "./js/interactives/ferrantiRise.js",
  "./js/interactives/freqBalance.js",
  "./js/interactives/functionalRoles.js",
  "./js/interactives/generator.js",
  "./js/interactives/gicPath.js",
  "./js/interactives/governorDroop.js",
  "./js/interactives/gridMap.js",
  "./js/interactives/gridUnits.js",
  "./js/interactives/interchangeLifecycle.js",
  "./js/interactives/isoConflict.js",
  "./js/interactives/oneLine.js",
  "./js/interactives/parallelFlow.js",
  "./js/interactives/powerTriangle.js",
  "./js/interactives/protectionSOE.js",
  "./js/interactives/pvCurve.js",
  "./js/interactives/reactiveSourcesBoard.js",
  "./js/interactives/relayCoordination.js",
  "./js/interactives/restorationApproach.js",
  "./js/interactives/restorationSeq.js",
  "./js/interactives/silCurve.js",
  "./js/interactives/solIrolLab.js",
  "./js/interactives/synchLab.js",
  "./js/interactives/threePhase.js",
  "./js/interactives/voltageDispatch.js",
  "./js/interactives/voltageProfile.js",
  "./icons/apple-touch-icon.png",
  "./icons/favicon-48.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png"
];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(APP_SHELL);
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter(name => name.startsWith('nerc-study-console-') && name !== CACHE_NAME).map(name => caches.delete(name)));
    await self.clients.claim();
    const clients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    clients.forEach(client => client.postMessage({ type: 'OFFLINE_READY' }));
  })());
});

self.addEventListener('message', event => {
  const data = event.data || {};
  if (data.type === 'SKIP_WAITING') self.skipWaiting();
  if (data.type === 'CACHE_STATUS') {
    event.waitUntil((async () => {
      const cache = await caches.open(CACHE_NAME);
      const keys = await cache.keys();
      const payload = { type: 'CACHE_STATUS', ready: keys.length >= APP_SHELL.length, cached: keys.length, expected: APP_SHELL.length, cache: CACHE_NAME };
      if (event.source && event.source.postMessage) event.source.postMessage(payload);
      else { const clients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true }); clients.forEach(client => client.postMessage(payload)); }
    })());
  }
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(request);
        const cache = await caches.open(CACHE_NAME);
        cache.put('./index.html', fresh.clone()).catch(() => {});
        return fresh;
      } catch (err) {
        const cache = await caches.open(CACHE_NAME);
        return (await cache.match('./index.html')) || (await cache.match('./'));
      }
    })());
    return;
  }

  event.respondWith((async () => {
    const cached = await caches.match(request);
    if (cached) return cached;
    try {
      const response = await fetch(request);
      if (response && response.ok) { const cache = await caches.open(CACHE_NAME); cache.put(request, response.clone()).catch(() => {}); }
      return response;
    } catch (err) {
      return new Response('Offline and this resource was not cached.', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
    }
  })());
});
