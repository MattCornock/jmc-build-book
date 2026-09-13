const CACHE = 'jmc-v9';
const ASSETS = ['./','./index.html','./manifest.json','./icon-192.png',
 './img/plan.jpg','./img/grain-train.jpg','./img/viaduct.jpg','./img/trestle.jpg','./img/scrub.jpg','./img/wall.jpg','./img/strata.jpg','./img/wharf.jpg','./img/station.jpg','./img/a-class.jpg','./img/an-ghan.jpg','./img/an-nr.jpg','./img/g-class.jpg'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(fetch(e.request).then(r => { const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return r; }).catch(() => caches.match(e.request, {ignoreSearch:true}).then(m => m || caches.match('./index.html'))));
});
