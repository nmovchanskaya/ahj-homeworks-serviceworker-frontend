const FETCH_PRIORITY_URLS = ['/', '/index.html', '/style.css'];

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

  async function cachePriorityThenFetch(event) {
    const cacheResponse = await caches.match(event.request);

    if (cacheResponse) {
      return cacheResponse;
    }

    let response;

    try {
      response = await fetch(event.request);
    } catch (error) {
      return;
    }

    const cache = await caches.open('my-best-cache');

    cache.put(event.request, response.clone());

    return response;
  }

  async function fetchPriorityThenCache(event) {
    let response;

    try {
      response = await fetch(event.request);
    } catch (error) {
      const cacheResponse = await caches.match(event.request);

      if (cacheResponse) {
        return cacheResponse;
      }

      return new Response('Нет соединения');
    }

    const cache = await caches.open('my-best-cache');

    cache.put(event.request, response.clone());

    return response;
  }

  self.addEventListener('fetch', (event) => {
    console.log('Происходит запрос на сервер');

    const url = new URL(event.request.url);
    console.log(url);

    /*if (FETCH_PRIORITY_URLS.includes(url.pathname)) {
      event.respondWith(fetchPriorityThenCache(event));

      return;
    }

    if (url.pathname.startsWith('/images/user')) {
      event.respondWith(fetchPriorityThenCacheThenImageFallback(event));

      return;
    }*/

    //event.respondWith(cachePriorityThenFetch(event));
    //event.respondWith(getCache(event));
    //if (event.request.url !== 'http://localhost:8080/') {
      event.respondWith(getFetch(event));
    //}
  });
