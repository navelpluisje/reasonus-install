import { app } from 'electron';
import fs from 'fs';
import path from 'path';

import { Action } from '../../types';
import { copyFile } from '../../utils/copyFile';
import { createFolder } from '../../utils/createFolder';
import { settings } from '../../utils/settings';
import { registerAction } from './registerAction';

type ScriptsFile = {
  assets: string[],
  scripts: Action[]
}

export const installActions = () => {
  const userDataPath = app.getPath('userData');
  const reaperPath = settings.get('reaperPath') as string;
  const srcDir = path.join(userDataPath, 'resources', 'Scripts');
  const destDir = path.join(reaperPath, 'Scripts', 'Reasonus');
  const scriptsFile: ScriptsFile = JSON.parse(fs.readFileSync(path.join(srcDir, 'scripts.json')).toString());

  // First move the assets around
  try {
    createFolder(path.join(destDir, 'assets'));

    for (const asset of scriptsFile?.assets || []) {
      copyFile(path.join(srcDir, 'assets'), path.join(destDir, 'assets'), asset);
    }
  } catch (error) {
    console.error('Error in installActions installing assets', error);
    return false;
  }

  try {
    for (const action of scriptsFile.scripts) {
      copyFile(srcDir, destDir, action.fileName);
      
      if (action.register) {
        registerAction(action);
      }
    }
    return true;
  } catch (error) {
    console.error('Error in installActions', error);
    return false;
  }
};