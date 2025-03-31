const { app, BrowserWindow, ipcMain } = require("electron");
const fs = require("fs");
const { filterFilesByType } = require("./utils/index");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

let mainWindow;

// Define the path to the public directory in the app's base path
const path = `${app.getAppPath()}/public`;

// Function to send a list of video files to the renderer process
function sendVideos(path) {
  // Read the contents of the directory at the given path
  const files = fs.readdirSync(path);

  // Send the list of video files (filtered by the "webm" type) to the renderer process
  mainWindow.webContents.send("getVideos", {
    // Filter the files to include only "webm" video files
    videos: filterFilesByType(files, "webm"),
    // Include the directory path in the response
    filePath: path,
  });
}

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
app.whenReady().then(() => {
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

// Handle the 'saveVideo' IPC request
ipcMain.handle("saveVideo", async (event, arrayBuffer) => {
  // Check if the directory exists; if not, create it
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }

  // Convert the arrayBuffer to a Buffer for writing to a file
  const buffer = Buffer.from(arrayBuffer);

  // Get the current timestamp to name the video file uniquely
  const now = new Date();

  // Write the buffer to a .webm file, and after writing, send the updated list of videos
  fs.writeFile(`${path}/${now.getTime()}.webm`, buffer, () => sendVideos(path));

  // End the handling of the IPC request
  return;
});

// Handle the 'fetchVideos' IPC request
ipcMain.handle("fetchVideos", async (event) => {
  // Send the list of videos from the directory
  sendVideos(path);

  // End the handling of the IPC request
  return;
});
