const cacheName = 'v1';

const cacheAssets = [
    'index.html',
    'about.html',
    '/css/styles.css',
    '/js/main.js'
];

// Call install Event
self.addEventListener('install', e => {
    console.log('Service Worker: Installed');
    e.waitUntil(
        caches
        .open(cacheName)
        .then(cache => {
            console.log('Service Workers : Caching Files');
            cache.addAll(cacheAssets);
        })
        .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', e => {
    console.log('Servic Worker: Activated');
    // Remove unwanted caches
    e.waitUntil(
        caches
        .keys()
        .then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        console.log('Service Workers : Clearing Old Caches');
                        return caches.delete(cache);
                    }
                })
            )
        })
    );
});

// Call Fetch Events
self.addEventListener('fetch', e => {
    console.log('Service Workers: Fetching');
    e.respondWith(
        fetch(e.request).catch(() => catches.match(e.request))
    )
});