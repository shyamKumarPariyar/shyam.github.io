const cacheName = 'v2';

// Call install Event
self.addEventListener('install', e => {
    console.log('Service Worker: Installed');
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
        fetch(e.request)
        .then(res => {
            // make copy clone of response
            const resClone = res.clone();
            // open cache
            caches
                .open(cacheName)
                .then(cache => {
                    // Add response to cache
                    cache.put(e.request, resClone);
                });
            return res;
        })
        .catch(err => caches.match(e.request).then(res => res))
    );
});