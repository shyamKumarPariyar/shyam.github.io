if ('serviceWorker' in navigator) {
    // console.log('Service Worker Supperted');
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('../sw_cached_site.js')
            .then(reg => console.log('Service worker : Regitered'))
            .catch(err => console.log(`Service Worker : Error: ${err}`))
    })
}