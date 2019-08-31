let interval;

function startListen() {
  interval = setInterval(() => {
    console.log(Date.now());
  }, 1000);
}
function stopListen() {
  clearInterval(interval);
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