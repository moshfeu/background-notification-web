let interval;

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
      tag: ''
    });
  }, 5000);
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