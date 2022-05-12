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
    actionId: 'REASONUS_ALWAYS_ON',
    displayName: 'Always On',
    fileName: 'always-on.lua',
    register: true,
  }, {
    actionId: 'REASONUS_SHOW_ALL_TRACKS',
    displayName: 'Show All Tracks',
    fileName: 'showAllTracks.lua',
    register: true,
  }, {
    actionId: 'REASONUS_REAPER_RESOURCE_PATH',
    displayName: 'Get Reaper Resource Path',
    fileName: 'getReaperResourcePath.lua',
    register: true,
  }, {
    actionId: 'REASONUS_SHOW_TRACKS_BY_NAME',
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