import {contextBridge, ipcRenderer} from 'electron';

import { FunctionActions } from '../types';

contextBridge.exposeInMainWorld('reasonusAPI', {
  downloadFiles: () => ipcRenderer.invoke('global:downloadFiles' ),
  getDummyAction: () => ipcRenderer.invoke('settings:getDummyAction'),
  getFunctionActions: () => ipcRenderer.invoke('settings:getFunctionActions'),
  getInitialReaperPath: () => ipcRenderer.invoke('global:getInitialReaperPath'),
  getOS: () => ipcRenderer.invoke('global:getOS'),
  getReaperPath: () => ipcRenderer.invoke('settings:getReaperPath'),
  goToExternal: (url: string) => ipcRenderer.invoke('navigate:goTo', url),
  installActions: () => ipcRenderer.invoke('reasonus:installActions'),
  installReaSonus: (actionId: string) => ipcRenderer.invoke('reasonus:install', actionId),
  saveFunctionActions: (functionActions: FunctionActions) => ipcRenderer.invoke('reasonus:saveFunctionActions', functionActions),
  selectFolder: () => ipcRenderer.invoke('dialog:openDirectory'),
  setReaperPath: (path: string) => ipcRenderer.invoke('settings:setReaperPath', path),
});