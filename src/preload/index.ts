import {contextBridge, ipcRenderer} from 'electron';

import { FunctionActions } from '../types';

contextBridge.exposeInMainWorld('reasonusAPI', {
  downloadFiles: () => ipcRenderer.invoke('global:downloadFiles' ),
  getDevice: () => ipcRenderer.invoke('settings:getDevice'),
  getDummyAction: () => ipcRenderer.invoke('settings:getDummyAction'),
  getFunctionActions: () => ipcRenderer.invoke('settings:getFunctionActions'),
  getInitialReaperPath: () => ipcRenderer.invoke('global:getInitialReaperPath'),
  getMidiDevices: () => ipcRenderer.invoke('reasonus:getMidiDevices'),
  getOS: () => ipcRenderer.invoke('global:getOS'),
  getReaperPath: () => ipcRenderer.invoke('settings:getReaperPath'),
  getVersionNumber: (version: string) => ipcRenderer.invoke('settings:getVersionNumber', version),
  goToExternal: (url: string) => ipcRenderer.invoke('navigate:goTo', url),
  installActions: (midiInput: string, midiOutpput: string) => ipcRenderer.invoke('reasonus:installActions', midiInput, midiOutpput),
  installReaSonus: () => ipcRenderer.invoke('reasonus:install'),
  saveFunctionActions: (functionActions: FunctionActions) => ipcRenderer.invoke('reasonus:saveFunctionActions', functionActions),
  selectFolder: () => ipcRenderer.invoke('dialog:openDirectory'),
  setReaperPath: (path: string) => ipcRenderer.invoke('settings:setReaperPath', path),
});