import {contextBridge, ipcRenderer} from 'electron';

contextBridge.exposeInMainWorld('reasonusAPI', {
  downloadFiles: () => ipcRenderer.invoke('global:downloadFiles' ),
  getDevice: () => ipcRenderer.invoke('settings:getDevice'),
  getInitialReaperPath: () => ipcRenderer.invoke('global:getInitialReaperPath'),
  getMidiDevices: () => ipcRenderer.invoke('reasonus:getMidiDevices'),
  getOS: () => ipcRenderer.invoke('global:getOS'),
  getReaperPath: () => ipcRenderer.invoke('settings:getReaperPath'),
  getVersionNumber: (version: string) => ipcRenderer.invoke('settings:getVersionNumber', version),
  goToExternal: (url: string) => ipcRenderer.invoke('navigate:goTo', url),
  installActions: (midiInput: string, midiOutpput: string) => ipcRenderer.invoke('reasonus:installActions', midiInput, midiOutpput),
  installReaSonus: () => ipcRenderer.invoke('reasonus:install'),
  selectFolder: () => ipcRenderer.invoke('dialog:openDirectory'),
  setReaperPath: (path: string) => ipcRenderer.invoke('settings:setReaperPath', path),
});