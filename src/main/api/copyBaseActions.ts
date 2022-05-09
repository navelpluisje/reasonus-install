import { app } from 'electron';
import path from 'path';

import { copyFile } from '../../utils/copyFile';
import { settings } from '../../utils/settings';

export const copyBaseActions = () => {
  const userDataPath = app.getPath('userData');
  const reaperPath = settings.get('reaperPath') as string;
  const baseActions = [
    'always-on.lua',
    'showTracksByName.lua',
  ];

  const srcDir = path.join(userDataPath, 'resources', 'Scripts');
  const destDir = path.join(reaperPath, 'Scripts', 'Reasonus');

  try {
    for (const fileName of baseActions) {
      copyFile(srcDir, destDir, fileName);
    }
    return true;
  } catch (error) {
    console.error('Error in copyBaseActions', error);
    return false;
  }
};