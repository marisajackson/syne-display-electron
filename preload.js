const {
    ipcRenderer
} = require("electron");

ipcRenderer.on('machine-data', function (event,store) {
    console.log(store);
    document.getElementById('machine-id').innerHTML = store;
});

ipcRenderer.on('is-online', function (event,store) {
    console.log(store);
    document.getElementById('is-online').innerHTML = store;
});
