import download from 'download';
import { app } from 'electron';
import fs from 'fs';
import os from 'os';
import path from 'path';

import { settings } from '../../utils/settings';

export const downloadFiles = async () => {
  const userDataPath = app.getPath('userData');
  // const latestRelease = await download('https://api.github.com/repos/navelpluisje/reasonus-faderport/releases/latest');
  // const releaseJson = JSON.parse(latestRelease.toString());

  try {
    await download('https://github.com/navelpluisje/reasonus-faderport/releases/download/v0.0.1-alpha-4/reasonus-faderport.zip', 
      path.join(userDataPath, 'resources'),
      {
        extract: true,
      });
    settings.set('resourceVersion', 'v0.0.1-alpha-4');
  } catch (e) {
    console.log('Error while downloading', e);
  }

  if (os.platform() === 'darwin' && fs.existsSync(path.join(userDataPath, 'resources', '__MACOSX'))) {
    fs.rmdirSync(path.join(userDataPath, 'resources', '__MACOSX'), {
      recursive: true,
    });
  }

};