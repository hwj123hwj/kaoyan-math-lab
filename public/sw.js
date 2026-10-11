/* 离线支持：同源 GET 资源采用 stale-while-revalidate 缓存。 */
const CACHE = 'kaoyan-math-v1';

self.addEventListener('install', (event) => {
  // 预缓存路径相对于 SW scope，兼容子路径部署
  const scope = new URL(self.registration.scope);
  const u = (p) => new URL(p, scope).href;
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll([u('./'), u('./daily'), u('./review'), u('./formulas')])));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))),
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  event.respondWith(
    caches.open(CACHE).then(async (cache) => {
      const cached = await cache.match(req);
      const refresh = fetch(req).then((res) => {
        if (res && res.ok) cache.put(req, res.clone());
        return res;
      }).catch(() => cached);
      return cached || refresh;
    }),
  );
});
