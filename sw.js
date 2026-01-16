const CACHE_NAME = 'pomodoro-timer-cache-v1';
const urlsToCache = [
  '/',
  '/timer.html', // Or whatever you name your main html file
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap',
  'https://cdn.pixabay.com/audio/2023/09/14/audio_5f251a1a1f.mp3'
];

// Install the service worker and cache the app's files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Serve cached content when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
