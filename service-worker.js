// Define o nome do cache
const CACHE_NAME = 'calculadora-real-cache-v1';
// Lista dos arquivos para cache
const urlsToCache = [
  'calculadora_real.html',
  'manifest.json',
  'https://cdn.tailwindcss.com', // Cache Tailwind CSS
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap', // Cache a fonte
  // Adicione outros arquivos estáticos se houver (imagens, css, js)
];

// Evento de instalação do Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento de fetch (intercepta requisições de rede)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retorna o recurso do cache se encontrado
        if (response) {
          return response;
        }
        // Caso contrário, busca na rede
        return fetch(event.request);
      })
    );
});

// Evento de ativação do Service Worker (limpa caches antigos)
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            // Exclui caches que não estão na whitelist
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
