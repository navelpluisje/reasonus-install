import download from 'download';
import fs from 'fs';
import os from 'os';
import path from 'path';

export const downloadFiles = async () => {
  try {
    await download('https://github.com/navelpluisje/reasonus-faderport/releases/download/v0.0.1-alpha-3/reasonus-faderport.zip', 
      path.join(__dirname, 'resources'),
      {
        extract: true,
      });
    console.log('Downloaded resources');
  } catch (e) {
    console.log('Error while downloading', e);
  }

  if (os.platform() === 'darwin' && fs.existsSync(path.join(__dirname, 'resources', '__MACOSX'))) {
    fs.rmdirSync(path.join(__dirname, 'resources', '__MACOSX'), {
      recursive: true,
    });
  }

};