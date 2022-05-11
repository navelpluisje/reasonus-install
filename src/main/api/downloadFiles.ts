import download from 'download';
import { app } from 'electron';
import fs from 'fs';
import os from 'os';
import path from 'path';

export const downloadFiles = async () => {
  const userDataPath = app.getPath('userData');

  // COpy files to the app Support folder
  try {
    await download('https://github.com/navelpluisje/reasonus-faderport/releases/download/v0.0.1-alpha-3/reasonus-faderport.zip', 
      path.join(userDataPath, 'resources'),
      {
        extract: true,
      });
  } catch (e) {
    console.log('Error while downloading', e);
  }

  if (os.platform() === 'darwin' && fs.existsSync(path.join(userDataPath, 'resources', '__MACOSX'))) {
    fs.rmdirSync(path.join(userDataPath, 'resources', '__MACOSX'), {
      recursive: true,
    });
  }

};