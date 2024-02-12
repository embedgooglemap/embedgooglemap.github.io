const staticCacheName = 'static-cache-v5';

const staticAssets = [
    './',
    './index.html',
    //'./map.html',
    './js/app.js',
    //'./google1b980d101a18a5da.html',
    './free-bing-maps-code-generator.png',
    './app-ads.txt'
    //'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css'
];



self.addEventListener('install', async event => {
    const cache = await caches.open(staticCacheName);
    await cache.addAll(staticAssets);
    console.log('Service worker has been installed');
});

self.addEventListener('activate', async event => {
    const cachesKeys = await caches.keys();
    const checkKeys = cachesKeys.map(async key => {
        if (staticCacheName !== key) {
            await caches.delete(key);
        }
    });
    await Promise.all(checkKeys);
    console.log('Service worker has been activated');
});

self.addEventListener('fetch', async event => {
    console.log(`Trying to fetch ${event.request.url}`);
    event.respondWith(caches.match(event.request).then(cachedResponse => {
        return cachedResponse || fetch(event.request)
    }));
}); 