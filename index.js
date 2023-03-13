const { app, BrowserWindow } = require('electron');
const path = require('path');
const { machineId, machineIdSync } = require('node-machine-id');
const checkInternetConnected = require('check-internet-connected');
const { exec } = require("child_process");

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

const createWindow = () => {
  const win = new BrowserWindow({
    // width: 800,
    // height: 600,
    show: false,
    frame: false,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });
  win.webContents.openDevTools();
  win.maximize();

  win.loadFile('index.html');
  machineId().then((id) => {
    win.webContents.send('machine-data', id);
  });

  var isOnline = false;
  var bleIsOn = false;

  checkConnection();

  var wifiCheckInterval = setInterval(checkConnection, 30000);

  function checkConnection() {
    console.log('checking connection....');
    checkInternetConnected()
      .then((result) => {
        console.log(result);//successfully connected to a server
        win.webContents.send('is-online', true);
        clearInterval(wifiCheckInterval);
      })
      .catch((ex) => {
        console.log(ex); // cannot connect to a server or error occurred.
        win.webContents.send('is-online', false);
        turnOnBleApp();
      });
  }


  function turnOnBleApp() {
    if (bleIsOn) {
      return;
    }

    bleIsOn = true;

    exec("sudo /usr/bin/python /home/syne/Desktop/display-ble/app.py", (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
    });
  }
}

