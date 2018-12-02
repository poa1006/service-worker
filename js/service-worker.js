self.addEventListener('push', function(event) {
  console.log('Received push');
  const payload = event.data ? event.data.text() : 'no payload';
  console.log(payload);

  const data = JSON.parse(payload);

  event.waitUntil(
    Promise.all([
      self.registration.showNotification(
        data.title,
        {
          body:  data.message,
          icon: data.icon
        })
    ])
  );
});

self.addEventListener('notificationclick', function(event) {
  console.log("click!!!");
  event.notification.close();

  let clickResponsePromise = Promise.resolve();
  if (event.notification.data && event.notification.data.url) {
    clickResponsePromise = clients.openWindow(event.notification.data.url);
  }

  event.waitUntil(
    Promise.all([
      clickResponsePromise
    ])
  );
});