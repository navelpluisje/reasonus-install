import { app } from 'electron';
import fs from 'fs';
import path from 'path';

import { Action } from '../../types';
import { copyFile } from '../../utils/copyFile';
import { settings } from '../../utils/settings';
import { registerAction } from './registerAction';

export const installActions = () => {
  const userDataPath = app.getPath('userData');
  const reaperPath = settings.get('reaperPath') as string;
  const srcDir = path.join(userDataPath, 'resources', 'Scripts');
  const destDir = path.join(reaperPath, 'Scripts', 'Reasonus');

  try {
    const baseActions: Action[] = JSON.parse(fs.readFileSync(path.join(srcDir, 'scripts.json')).toString());

    for (const action of baseActions) {
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