const {
    ipcRenderer
} = require("electron");

ipcRenderer.on('machine-data', function (event,store) {
    console.log(store);
    document.getElementById('machine-id').innerHTML = store;
});

ipcRenderer.on('is-online', function (event,store) {
    switch (store) {
      case true:
        setTimeout(() => {
          document.getElementById('splash').style.opacity = '0';
          document.getElementById('set-up').style.opacity = '0';
        }, 3000);
        break;
      case false:
        setTimeout(() => {
          document.getElementById('splash').style.opacity = '0';
          document.getElementById('set-up').style.opacity = '1';
        }, 3000);
        break;
      default:
        document.getElementById('splash').style.opacity = '1';
        break;
    }
    document.getElementById('is-online').innerHTML = store;
});
