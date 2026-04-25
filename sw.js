// struktiva v9.7 Service Worker
const CACHE_NAME = 'struktiva-v97';
const urlsToCache = ['/', '/index.html'];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

// Push für Medikamente
self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'struktiva';
  const options = {
    body: data.body || 'Medikament fällig',
    icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyIiBoZWlnaHQ9IjE5MiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTkyIiBoZWlnaHQ9IjE5MiIgcng9IjMyIiBmaWxsPSIjMGYxNzJhIi8+PHRleHQgeD0iOTYiIHk9IjEyMCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjgwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+UzwvdGV4dD48L3N2Zz4=',
    badge: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iOTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iNDgiIGN5PSI0OCIgcj0iNDgiIGZpbGw9IiMyMmM1NWUiLz48L3N2Zz4=',
    vibrate: [200, 100, 200, 100, 200],
    tag: 'struktiva-med',
    renotify: true,
    requireInteraction: true,
    actions: [
      {action: 'taken', title: '✓ Eingenommen'},
      {action: 'snooze', title: '⏰ 10 Min'}
    ]
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  if (event.action === 'taken') {
    // Mark as taken
  } else if (event.action === 'snooze') {
    // Snooze 10 min
  }
  event.waitUntil(clients.openWindow('/'));
});
