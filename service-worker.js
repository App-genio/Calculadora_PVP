const CACHE_NAME = 'cost-calculator-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  // Asegúrate de que las URLs de tus íconos sean accesibles
  '/icon-192x192.png',
  '/icon-512x512.png',
  // URL de Tailwind CSS CDN para que funcione sin conexión
  'https://cdn.tailwindcss.com'
];

self.addEventListener('install', event => {
  // Cuando se instala el service worker, se guardan los archivos en la caché.
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache abierta');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  // Intercepta las solicitudes de la red y sirve los archivos desde la caché si están disponibles.
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si hay una respuesta en la caché, la devuelve.
        if (response) {
          return response;
        }
        // Si no, realiza la solicitud a la red.
        return fetch(event.request);
      })
  );
});
