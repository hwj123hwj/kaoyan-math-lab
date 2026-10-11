/* 离线支持：同源 GET 资源网络优先，失败回退缓存。
   注意：SW 禁止用"重定向响应"答复导航（会得到 ERR_FAILED），
   因此只缓存非重定向响应，预缓存一律使用带尾斜杠的最终地址。 */
const CACHE = 'kaoyan-math-v2';

self.addEventListener('install', (event) => {
  const scope = new URL(self.registration.scope);
  const u = (p) => new URL(p, scope).href;
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll([u('./'), u('./daily/'), u('./review/'), u('./formulas/')])));
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
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    try {
      const fresh = await fetch(req);
      // 重定向响应不得写入缓存，也不得由 SW 返回给导航请求
      if (fresh && fresh.ok && !fresh.redirected) cache.put(req, fresh.clone());
      return fresh;
    } catch {
      const hit = (await cache.match(req))
        || (await cache.match(url.pathname.endsWith('/') ? url.pathname : url.pathname + '/'));
      if (hit && !hit.redirected) return hit;
      return new Response('离线且缓存不可用', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
    }
  })());
});
