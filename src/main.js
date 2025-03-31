const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const fs = require("fs");
const { filterFilesByType } = require("./utils/index");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

let mainWindow;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      nodeIntegration: true,
      webSecurity: false,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.handle("saveVideo", async (event, arrayBuffer) => {
  const path = `${app.getAppPath()}/public`;

  // make the directory if nonexistant
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
  const buffer = Buffer.from(arrayBuffer);
  const now = new Date();
  fs.writeFile(`${path}/${now.getTime()}.webm`, buffer, () => {});

  const files = fs.readdirSync(path);

  // Send result back to renderer process
  await mainWindow.webContents.send("getVideos", {
    videos: filterFilesByType(files, "webm"),
    filePath: path,
  });

  return;
});

ipcMain.handle("fetchVideos", async (event) => {
  const path = `${app.getAppPath()}/public`;
  const files = fs.readdirSync(path);

  // Send result back to renderer process
  await mainWindow.webContents.send("getVideos", {
    videos: filterFilesByType(files, "webm"),
    filePath: path,
  });

  return;
});
