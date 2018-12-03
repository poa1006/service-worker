
const publicKey = 'BMtvv6ypKsXF_b9J5IQjUMVohEenVZ-eAfQK3VJc1WB4wUWSPNgNr2fszEJazYF2bBYJnF2YAi2jIDLtdlE1tSE';

if (navigator.serviceWorker) {
  console.log('serviceWorker first try');
  registerPush(publicKey);
}
else{
  console.log('No serviceWorker');
}

function registerPush(appPubkey) {
  navigator.serviceWorker.register('js/service-worker.js');
  navigator.serviceWorker.ready.then(function(registration) {
      return registration.pushManager.getSubscription()
          .then(function(subscription) {
              console.log(JSON.stringify({ subscription: subscription }));
              if (subscription) {
                  return subscription;
              }

              return registration.pushManager.subscribe({
                  userVisibleOnly: true,
                  applicationServerKey: urlBase64ToUint8Array(appPubkey)
              });
          }) 
          .then(function(subscription) {
              console.log(JSON.stringify({ subscription: subscription }));
          });
  });
}

function urlBase64ToUint8Array(base64String) {
  var padding = '='.repeat((4 - base64String.length % 4) % 4);
  var base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);

  for (var i = 0; i < rawData.length; ++i)  {
      outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
}