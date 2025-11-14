// Service Worker da Calculadora Leonor

const CACHE_NAME = 'leonor-cache-v1';

// Ficheiros a colocar em cache para funcionamento offline
const FILES_TO_CACHE = [
  '/Leonor-CalculadoraHC/',
  '/Leonor-CalculadoraHC/index.html',
  '/Leonor-CalculadoraHC/manifest.json',
  '/Leonor-CalculadoraHC/icon-512.png'
];

// Instalação: adiciona ficheiros ao cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
});

// Ativação: limpa caches antigos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );
    })
  );
});

// Intercetador de pedidos: responde com cache primeiro, se existir
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});