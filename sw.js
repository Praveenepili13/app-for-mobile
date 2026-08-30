const CACHE_NAME = 'app-cache-v2';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './manifest.json'
];

// Install Event - Caching Assets
self.addEventListener('install', (event) => {
    self.skipWaiting(); // Force new service worker to take control immediately
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
    );
});

// Activate Event - Clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch Event - Serve cached assets when offline
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => response || fetch(event.request))
    );
});
