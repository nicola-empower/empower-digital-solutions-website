self.addEventListener('install', (e) => {
    self.skipWaiting();
});

self.addEventListener('activate', (e) => {
    e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (e) => {
    // Basic pass-through fetch handler
    // In a real PWA, you would handle caching here
    e.respondWith(fetch(e.request));
});
