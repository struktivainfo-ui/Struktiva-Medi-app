// struktiva v9.8 SW - Push zuverlässig
const CACHE = 'struktiva-v98-1';
const ASSETS = ['/', '/index.html', '/manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});

// Push mit Actions
self.addEventListener('push', e => {
  const d = e.data ? e.data.json() : {title:'struktiva', body:'Medikament fällig'};
  e.waitUntil(self.registration.showNotification(d.title, {
    body: d.body,
    icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyIiBoZWlnaHQ9IjE5MiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTkyIiBoZWlnaHQ9IjE5MiIgcng9IjMyIiBmaWxsPSIjMGYxNzJhIi8+PHRleHQgeD0iOTYiIHk9IjEyMCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjgwIiBmaWxsPSIjMjJjNTVlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXdlaWdodD0iYm9sZCI+UzwvdGV4dD48L3N2Zz4=',
    badge: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzIiIGhlaWdodD0iNzIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMzYiIGN5PSIzNiIgcj0iMzYiIGZpbGw9IiMyMmM1NWUiLz48L3N2Zz4=',
    vibrate: [200,100,200],
    tag: 'med',
    renotify: true,
    requireInteraction: true,
    actions: [
      {action:'taken', title:'✓ Eingenommen'},
      {action:'snooze', title:'⏰ 10min'}
    ],
    data: d
  }));
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  const action = e.action;
  e.waitUntil(
    clients.matchAll({type:'window'}).then(ws => {
      const url = '/?action=' + action + '&t=' + Date.now();
      if (ws.length) { ws[0].navigate(url); return ws[0].focus(); }
      return clients.openWindow(url);
    })
  );
});
