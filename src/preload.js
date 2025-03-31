const { contextBridge, ipcRenderer } = require("electron");

// Exposing a custom API to the renderer process using contextBridge
contextBridge.exposeInMainWorld("api", {
  // Function to save a video: it uses ipcRenderer to invoke the "saveVideo" event in the main process
  saveVideo: async (arrayBuffer) =>
    await ipcRenderer.invoke("saveVideo", arrayBuffer),

  // Function to get videos: it listens to the "getVideos" event from the main process
  // and executes the callback function (func) when the event is triggered
  getVideos: (func) =>
    ipcRenderer.on("getVideos", (_, ...args) => func(...args)),

  // Function to fetch videos: it uses ipcRenderer to invoke the "fetchVideos" event in the main process
  fetchVideos: async () => await ipcRenderer.invoke("fetchVideos"),
});
