import { app, BrowserWindow, ipcMain, shell } from 'electron';
import installExtension, { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } from 'electron-devtools-installer';
import os from 'os';
import path from 'path';

import { FunctionActions } from '../types';
import { isDev } from '../utils/isDev';
import { settings } from '../utils/settings';
import { downloadFiles } from './api/downloadFiles';
import { getFunctionActions } from './api/getFunctionActions';
import { getInitialReaperDirectory } from './api/getInitialReaperDirectory';
import { getMidiDevices } from './api/getMidiDevices';
import { getReaperDirectory } from './api/getReaperDirectory';
import { getVersionNumber } from './api/getVersionNumber';
import { installActions } from './api/installActions';
import { installCSI } from './api/installCSI';
import { installReaSonus } from './api/installReaSonus';
import { setFunctionActions } from './api/setFunctionActions';

// This allows TypeScript to pick up the magic constant that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const HOME_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

let mainWindow: BrowserWindow;

const createWindow = (): void => {
  const reaperPath = settings.get('reaperPath') as string;
  if (reaperPath) {
    getFunctionActions();
  }
  const HEADER_COMMANDS_HEIGHT = 50;
  const MACOS_TRAFFIC_LIGHTS_HEIGHT = 16;
  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 650,
    minHeight: 650,
    minWidth: 900,
    resizable: false,
    titleBarOverlay: process.platform === 'darwin',
    titleBarStyle: process.platform === 'darwin' ? 'hiddenInset' : undefined,
    trafficLightPosition: {
      x: 20,
      y: HEADER_COMMANDS_HEIGHT / 2 - MACOS_TRAFFIC_LIGHTS_HEIGHT / 2,
    },
    webPreferences: {
      preload: path.join(__dirname,  'preload.js'),
    },
    width: 1100,
  });

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
  
  
  // and load the index.html of the app.
  mainWindow.loadURL(HOME_WEBPACK_ENTRY);

  if (isDev()) {
    // Open the DevTools.
    mainWindow.webContents.openDevTools();
  }
};

ipcMain.handle('dialog:openDirectory', async () => await getReaperDirectory(mainWindow));
ipcMain.handle('settings:setReaperPath', (_, path: string) => {
  settings.set('reaperPath', path);
});
ipcMain.handle('settings:getReaperPath', () => settings.get('reaperPath'));
ipcMain.handle('settings:getDummyAction', () => settings.get('dummyAction'));
ipcMain.handle('settings:getFunctionActions', () => settings.get('functionActions'));
ipcMain.handle('settings:getVersionNumber', (_, version: string) => getVersionNumber(version));

ipcMain.handle('global:getOS', os.platform);
ipcMain.handle('global:downloadFiles', downloadFiles);
ipcMain.handle('global:getInitialReaperPath', getInitialReaperDirectory);

ipcMain.handle('navigate:goTo', (_, url: string) => shell.openExternal(url));

ipcMain.handle('reasonus:getMidiDevices', getMidiDevices);

ipcMain.handle('reasonus:installActions', (_, midiInput: string, midiOutput: string) => { 
  if (!installActions()) {
    return false;
  }
  if (!installCSI(midiInput, midiOutput)) {
    return false;
  }
  return true;
});
  
ipcMain.handle('reasonus:install', installReaSonus);
  
ipcMain.handle('reasonus:saveFunctionActions', (_, functionActions: FunctionActions) => {
  settings.set('functionActions', functionActions);
  setFunctionActions(functionActions);
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

if (isDev()) {
  app.whenReady().then(() => {
    installExtension([REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS])
      .then((name) => console.log(`Added Extension:  ${name}`))
      .catch((err) => console.log('An error occurred: ', err));
  });
}
