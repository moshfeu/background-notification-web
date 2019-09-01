let interval;
let cache = [];

self.addEventListener('notificationclick', function(event) {
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
    fetch('http://localhost:3000')
      .then(data => data.json())
      .then(data => {
        if (data.some(i => !cache.includes(i._id))) {
          sendNotification();
          cache = data.map(u => u._id);
        }
      });
  }, 1000);
}

function stopListen() {
  clearInterval(interval);
}

function sendNotification() {
  self.registration.showNotification(`New user!`, {
    body: 'Click to go to approval panel',
    icon: '',
    tag: '',
  });
}

self.addEventListener('message', ({data}) => {
  switch (data) {
    case 'start':
      startListen();
      break;
    case 'stop':
      stopListen();
      break;
  }
});