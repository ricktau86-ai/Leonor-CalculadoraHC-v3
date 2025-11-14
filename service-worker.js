// Service Worker da Calculadora Leonor

// Atualizamos o nome da cache para forçar a atualização do Service Worker
const CACHE_NAME = 'leonor-cache-v2';

// Lista de ficheiros a colocar em cache. Usamos caminhos relativos para que funcione
// independentemente do subdiretório em que a app está alojada.
const FILES_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon-512.png'
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
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))
    )
  );
});

// Intercetador de pedidos: responde com cache ou rede conforme o tipo de pedido
self.addEventListener('fetch', event => {
  // Para pedidos de navegação (páginas HTML), tenta a rede primeiro
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match('./index.html'))
    );
    return;
  }
  // Para outros pedidos (CSS, JS, imagens), usa cache-first
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

});
