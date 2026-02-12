/* ════════════════════════════════════════════
   FitCore — Service Worker
   Cache-first para assets estáticos,
   network-first para tudo mais.
════════════════════════════════════════════ */

const CACHE_NAME = 'fitcore-v1';

const PRECACHE_ASSETS = [
  './',
  './index.html',
  './appmanifest.json'
];

/* ── Install: pré-cache dos assets principais ── */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS);
    })
  );
  self.skipWaiting();
});

/* ── Activate: limpa caches antigos ── */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

/* ── Fetch: cache-first para HTML/CSS/JS ── */
self.addEventListener('fetch', (event) => {
  // Ignora requisições que não sejam GET
  if (event.request.method !== 'GET') return;
  // Ignora extensões do Chrome
  if (event.request.url.includes('chrome-extension')) return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request)
        .then((response) => {
          // Só cacheia respostas válidas do mesmo origem
          if (
            response &&
            response.status === 200 &&
            response.type === 'basic'
          ) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return response;
        })
        .catch(() => {
          // Fallback offline para navegação
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
        });
    })
  );
});
