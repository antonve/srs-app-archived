const electron = require('electron')
const url = require('url')
const path = require('path')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
const windows = []
function createWindow() {
  // Create the browser window.
  const width = 1000
  const height = 800
  const options = {
    pathname: path.join(__dirname, 'web', 'index.html'),
    protocol: 'file:',
    slashes: true,
  }
  let w = new BrowserWindow({ width, height })

  if (process.env.NODE_ENV === 'development') {
    options.pathname = 'localhost:8080/index.html'
    options.protocol = 'http:'
  }

  // and load the index.html of the app.
  w.loadURL(url.format(options))

  windows.push(w)

  // Emitted when the window is closed.
  w.on('closed', () => {
    // Dereference the window object
    windows.splice(windows.indexOf(w), 1)
    w = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createWindow()
  console.log(app.getPath('appData'))
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (windows.length === 0) {
    createWindow()
  }
})
