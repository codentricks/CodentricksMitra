const shell = require("electron").shell;
const { app, BrowserWindow, ipcMain, Menu, dialog } = require("electron");
const url = require("url");
const path = require("path");

const preloadPath = path.join(__dirname, "preload.js");

ipcMain.handle("dialog:openFile", async () => {
  const result = await dialog.showOpenDialog({ properties: ["openFile"] });
  return result.filePaths;
});

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  var menu = Menu.buildFromTemplate([
    {
      label: "Menu",
      submenu: [
        { type: "separator" },
        {
          label: "Exit",
          click() {
            app.quit();
          },
          accelerator: "Ctrl+Shift+E",
        },
      ],
    },
    {
      label: "Settings",
      submenu: [
        {
          label: "Help",
          click() {
            shell.openExternal("https://www.codentricks.com/contact");
          },
        },
        { type: "separator" },
        {
          label: "Reload",
          accelerator: "Ctrl+f5",
          click: () => {
            mainWindow.reload();
          },
        },
        {
          label: "Console",
          accelerator: "Ctrl+O",
          click: () => {
            mainWindow.openDevTools();
          },
        },
      ],
    },
  ]);
  Menu.setApplicationMenu(menu);
  //Menu.setApplicationMenu(null);

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 720,
    frame: true,

    icon: __dirname + "/img/icon.png",
    webPreferences: {
      sandbox: false,
      // preload: preloadPath,
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
    },
  });
  //createWindow.setMenu(null);
  //mainWindow.loadURL('index.html')
  mainWindow.loadURL(`file://${__dirname}/index.html`);
  //mainWindow.webContents.openDevTools()

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}
app.on("createWindow", function (e, window) {
  window.setMenu(null);
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});
