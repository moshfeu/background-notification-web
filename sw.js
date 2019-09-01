let interval;

self.addEventListener('notificationclick', function(event) {
  console.log('On notification click: ', event.notification.tag);
  event.notification.close();

  event.waitUntil(clients.matchAll({
    type: 'window'
  }).then(function(clientList) {
    if (clientList.length) {
      const [client] = clientList;

      if ('focus' in client) {
        return client.focus();
      } else if (clients.openWindow) {
        return clients.openWindow('/#notification');
      }
    }
  }));
});

function startListen() {
  interval = setInterval(() => {
    console.log(Date.now());
  }, 1000);
}

function stopListen() {
  clearInterval(interval);
}

function sendTestNotification() {
  setTimeout(() => {
    self.registration.showNotification(`I'm a notification from the service worker!!`, {
      body: 'How cool is that?',
      icon: '',
      tag: '',
    });
  }, 1000);
}

self.addEventListener('message', ({data}) => {
  switch (data) {
    case 'start':
      startListen();
      break;
    case 'stop':
      stopListen();
      break;
    case 'notification':
      sendTestNotification();
      break;
  }
});