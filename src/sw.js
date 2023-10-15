self.addEventListener('install', (event) => {
    console.log('Установлен');

    event.waitUntil(
      caches.open('my-best-cache')
        .then((cache) => {
          cache.addAll([
            './',
            './index.html',
            'main.css',
          ]);
        }),
    );
  });

  self.addEventListener('activate', (event) => {
    console.log('Активирован');
  });

  async function getCache(event) {
    const cacheResponse = await caches.match(event.request);

    if (cacheResponse) {
      return cacheResponse;
    }
  }

  async function getFetch(event) {
    let response;

    console.log(event.request);
    try {
      response = await fetch(event.request);
    } catch (error) {
      return;
    }

    const cache = await caches.open('my-best-cache');

    cache.put(event.request, response.clone());

    return response;
  }

  self.addEventListener('fetch', (event) => {
    console.log('Происходит запрос на сервер');

    const url = new URL(event.request.url);
    console.log(url);

    event.respondWith(getFetch(event));
  });
