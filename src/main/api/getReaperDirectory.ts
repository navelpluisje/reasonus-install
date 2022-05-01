import { app, dialog } from 'electron';

import { settings } from '../../utils/settings';

export const getReaperDirectory = async (browserWindow: Electron.BrowserWindow) => {
  const { canceled, filePaths } = await dialog.showOpenDialog(browserWindow, {
    defaultPath: app.getPath('appData'),
    properties: [
      'openDirectory',
      'showHiddenFiles',
    ],
  });
  if (canceled) {
    return; 
  } else {
    settings.set('reaperPath', filePaths[0]);
    return filePaths[0];
  }

};