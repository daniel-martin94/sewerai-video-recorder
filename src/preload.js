const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  saveVideo: async (arrayBuffer) => {
    return await ipcRenderer.invoke("saveVideo", arrayBuffer);
  },
});
