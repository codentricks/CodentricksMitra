const { contextBridge, ipcRenderer, dialog } = require("electron");

// Expose safe APIs to the renderer
contextBridge.exposeInMainWorld("electronAPI", {
  selectFile: () => ipcRenderer.invoke("dialog:openFile"),
});
