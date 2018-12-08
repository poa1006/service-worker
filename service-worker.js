console.log('serviceWorker work');

self.addEventListener('push', function(event) {
  console.log('Received push');
  const payload = event.data ? event.data.text() : 'no payload';
  console.log(payload);

  const data = JSON.parse(payload);

  event.waitUntil(
    Promise.all([
      self.registration.showNotification(
        data.title,
        data.option)
    ])
  );
});

self.addEventListener('notificationclick', function(event) {
  console.log("click!!!");
  event.notification.close();

  const request = new XMLHttpRequest();
  const url = 'https://ax7asfdg4f.execute-api.ap-southeast-2.amazonaws.com/prod/clicked';
  request.open("POST", url, true);
  
  request.onreadystatechange = function() { // Call a function when the state changes.
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        // Request finished. Do processing here.
        console.log("Clicked campaign updated");
    }
  }
  
  let clickResponsePromise = Promise.resolve();
  if (event.notification && event.notification.url) {
    clickResponsePromise = clients.openWindow(event.notification.url);
  }

  if (event.notification && event.notification.eventId) {
    request.send(JSON.stringify({ Guid: eventId }));
  }

  event.waitUntil(
    Promise.all([
      clickResponsePromise
    ])
  );
});