// Service worker: guarda o app no aparelho para abrir sem internet.
// Ao mudar qualquer arquivo do app, aumente a versão abaixo para os aparelhos baixarem a nova versão.
const CACHE = 'contagem-estoque-v3';

const ASSETS = [
  './',
  './index.html',
  './etiquetas-teste.html',
  './manifest.webmanifest',
  './css/app.css',
  './vendor/xlsx.full.min.js',
  './vendor/html5-qrcode.min.js',
  './vendor/fontawesome/css/fontawesome.min.css',
  './vendor/fontawesome/css/solid.min.css',
  './vendor/fontawesome/webfonts/fa-solid-900.woff2',
  './fonts/inter-latin-400-normal.woff2',
  './fonts/inter-latin-500-normal.woff2',
  './fonts/inter-latin-600-normal.woff2',
  './fonts/inter-latin-700-normal.woff2',
  './fonts/inter-latin-800-normal.woff2',
  './fonts/inter-latin-900-normal.woff2',
  './fonts/jetbrains-mono-latin-500-normal.woff2',
  './fonts/jetbrains-mono-latin-700-normal.woff2',
  './icons/icon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/maskable-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

// Primeiro o que está guardado no aparelho; se não tiver, busca na rede.
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;

  if (req.mode === 'navigate') {
    event.respondWith(
      caches.match(req, { ignoreSearch: true })
        .then((cached) => cached || fetch(req))
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  event.respondWith(
    caches.match(req, { ignoreSearch: true }).then((cached) => {
      if (cached) return cached;
      return fetch(req).then((res) => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then((cache) => cache.put(req, copy));
        }
        return res;
      });
    })
  );
});
