const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  saveVideo: async (arrayBuffer) => {
    return await ipcRenderer.invoke("saveVideo", arrayBuffer);
  },
  getVideos: (func) => {
    ipcRenderer.on("getVideos", (_, ...args) => func(...args));
  },
});
