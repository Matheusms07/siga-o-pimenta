// Service Worker para PWA e notificações
const CACHE_NAME = 'pimenta-v1';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/admin.html',
        '/manifest.json'
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Listener para notificações push
self.addEventListener('push', (event) => {
  const options = {
    body: 'Hora de atualizar sua localização! 🌶️',
    icon: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ctext y=".9em" font-size="90"%3E🌶️%3C/text%3E%3C/svg%3E',
    badge: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ctext y=".9em" font-size="90"%3E🌶️%3C/text%3E%3C/svg%3E',
    tag: 'pimenta-reminder',
    requireInteraction: true,
    actions: [
      {
        action: 'update',
        title: 'Atualizar Agora'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Pimenta, onde você está?', options)
  );
});

// Ação quando clica na notificação
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'update') {
    event.waitUntil(
      clients.openWindow('/admin.html')
    );
  } else {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});