import {contextBridge, ipcRenderer} from 'electron';

import { FunctionActions } from '../types';

contextBridge.exposeInMainWorld('reasonusAPI', {
  copyBaseActions: () => ipcRenderer.invoke('reasonus:copyBaseActions'),
  copyToClipboard: (text: string) => ipcRenderer.invoke('globale:copyToClipboard', text),
  downloadFiles: () => ipcRenderer.invoke('globale:downloadFiled' ),
  getDummyAction: () => ipcRenderer.invoke('settings:getDummyAction'),
  getFunctionActions: () => ipcRenderer.invoke('settings:getFunctionActions'),
  getOS: () => ipcRenderer.invoke('globale:getOS'),
  getReaperPath: () => ipcRenderer.invoke('settings:getReaperPath'),
  goToExternal: (url: string) => ipcRenderer.invoke('navigate:goTo', url),
  installReaSonus: (actionId: string) => ipcRenderer.invoke('reasonus:install', actionId),
  saveFunctionActions: (functionActions: FunctionActions) => ipcRenderer.invoke('reasonus:saveFunctionActions', functionActions),
  selectFolder: () => ipcRenderer.invoke('dialog:openDirectory'),
  setReaperPath: (path: string) => ipcRenderer.invoke('settings:setReaperPath', path),
});