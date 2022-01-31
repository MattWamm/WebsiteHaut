// include the Node.js 'path' module at the top of your file
const path = require('path')
const threejs = require('three')
const { app, BrowserWindow } = require('electron')
function createWindow () {
  const win = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('index.html')
}
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  })
})
