import { app } from 'electron';
import path from 'path';

import { Action } from '../../types';
import { copyFile } from '../../utils/copyFile';
import { settings } from '../../utils/settings';
import { registerAction } from './registerAction';

export const installActions = () => {
  const userDataPath = app.getPath('userData');
  const reaperPath = settings.get('reaperPath') as string;
  const baseActions: Action[] = [{
    displayName: 'Always On',
    fileName: 'always-on.lua',
    register: true,
  }, {
    displayName: 'Show All Tracks',
    fileName: 'showAllTracks.lua',
    register: true,
  }, {
    displayName: 'Get Reaper Resource Path',
    fileName: 'getReaperResourcePath.lua',
    register: true,
  }, {
    displayName: 'Show Tracks By Name',
    fileName: 'showTracksByName.lua',
    register: false,
  }];

  const srcDir = path.join(userDataPath, 'resources', 'Scripts');
  const destDir = path.join(reaperPath, 'Scripts', 'Reasonus');
 
  try {
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