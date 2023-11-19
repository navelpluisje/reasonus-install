import { app } from 'electron';
import fs from 'fs';
import path from 'path';

import { Action } from '../../types';
import { copyFile } from '../../utils/copyFile';
import { createFolder } from '../../utils/createFolder';
import { log } from '../../utils/log';
import { settings } from '../../utils/settings';
import { registerAction } from './registerAction';
import { unRegisterActions } from './unRegisterActions';

type ScriptsFile = {
  assets: string[],
  scripts: Action[]
}

/**
 * Install all the action files and assets needed for this build. 
 * Also cleanup and remove any unused script or asset
 * 
 * @returns boolean True on success, false otherwise
 */
// eslint-disable-next-line complexity
export const installActions = () => {
  log.info('installActions', 'started');
  const userDataPath = app.getPath('userData');
  const reaperPath = settings.get('reaperPath') as string;
  const srcDir = path.join(userDataPath, 'resources', 'Scripts');
  const destDir = path.join(reaperPath, 'Scripts', 'Reasonus');
  const assetsDir = path.join(
    reaperPath, 'Scripts', 'Reasonus', 'assets',
  );
  const scriptsFile: ScriptsFile = JSON.parse(fs.readFileSync(path.join(srcDir, 'scripts.json')).toString());

  // First move the assets around
  try {
    log.info('installActions', 'Installing the assets');
    createFolder(path.join(destDir, 'assets'));

    for (const asset of scriptsFile?.assets || []) {
      copyFile(path.join(srcDir, 'assets'), assetsDir, asset);
    }
  } catch (error) {
    log.error('installActions', 'Error in installActions installing assets', error);
    return false;
  }

  /**
   * Copying all the files to the right folders
   */
  try {
    log.info('installActions', 'Installing and registering scripts ');
    for (const action of scriptsFile.scripts) {
      if (!fs.existsSync(path.join(destDir, action.fileName)) || action.overwrite) {
        copyFile(srcDir, destDir, action.fileName);
      }
      
      if (action.register) {
        registerAction(action);
      }
    }

  } catch (error) {
    log.error('installActions', 'Error in copying scripts or registering actions', error);
    return false;
  }

  // TODO: Do we ned to check if there is a migration?
  /**
   * Cleaning up un-used files
   */
  try {
    log.info('installActions', 'Cleaning up unused files');
    const actionIds = scriptsFile.scripts.map((action) => action.actionId);
    const fileNames = scriptsFile.scripts.map((action) => action.fileName);
    const dirFileNames = fs.readdirSync(destDir);
    const assetFiles = fs.readdirSync(assetsDir);

    // Unregister all actions not needed anymore
    if (!unRegisterActions(actionIds)) {
      throw Error('Error while unregistering actions');
    }  
    // Cleaning up the scripts
    dirFileNames.forEach((fileName) => {
      if (!fileNames.includes(fileName)) {
        if (fs.lstatSync(path.join(destDir, fileName)).isFile() ) {
          fs.rmSync(path.join(destDir, fileName));
        }
      }
    });
    // Cleaning up the assets
    assetFiles.forEach((fileName) => {
      if (!scriptsFile.assets.includes(fileName)) {
        if (fs.lstatSync(path.join(assetsDir, fileName)).isFile() ) {
          fs.rmSync(path.join(assetsDir, fileName));
        }
      } 
    });
    return true;
  } catch (error) {
    log.error('installActions', 'Error in cleanupActions', error);
    return false;

  }
};