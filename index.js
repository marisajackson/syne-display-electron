const { app, BrowserWindow } = require('electron');
const path = require('path');

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
      preload: path.join(__dirname, 'preload.js')
    }
  });
  win.webContents.openDevTools();
  win.maximize();

  win.loadFile('index.html');
}
