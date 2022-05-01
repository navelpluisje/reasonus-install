import path from 'path';

import { copyFile } from '../../utils/copyFile';
import { settings } from '../../utils/settings';

export const copyBaseActions = () => {
  const reaperPath = settings.get('reaperPath') as string;
  const baseActions = [
    'always-on.lua',
  ];

  const srcDir = path.join(__dirname, 'resources');
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