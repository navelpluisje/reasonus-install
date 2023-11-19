import { app } from 'electron';
import os from 'os';
import path from 'path';

import { PortCount } from '../../types';
import { copyFile } from '../../utils/copyFile';
import { createFolder } from '../../utils/createFolder';
import { log } from '../../utils/log';
import { settings } from '../../utils/settings';
import { getMidiDevices } from './getMidiDevices';
import { addCsiToReaperIni } from './utils/addCsiToReaperIni';
import { handleSciIni } from './utils/handleCsiIni';

const regex = /FP(2|8|16)/;

/**
 * Handles the base installation for ReaSonus. Sets the values to the different REAPER ini files,
 * creates the base folder structure and installs the csi plugin.
 * @param midiInput The REAPER id of the midi input device
 * @param midiOutput The REAPER id of the midi output device
 * @returns 
 */
export const installCSI = (midiInput: string, midiOutput: string) => {
  log.info('installCSI', 'started');
  let fileName = '';
  const midiDevices = getMidiDevices();
  let deviceName: string;

  try {
    log.info('installCSI', 'Getting device names and executable filenames');
    if (os.platform() === 'darwin') {
      deviceName = midiDevices.in.find(((device) => device.id === midiInput)).fullName;
      fileName = 'reaper_csurf_integrator.dylib';
    } else {
      deviceName = midiDevices.in.find(((device) => device.id === midiInput)).name;
      fileName = 'reaper_csurf_integrator.dll';
    }
  } catch (error) {
    log.error('installCSI', `Platform: ${os.platform()} is not supported`);
    return false;
  }

  if (fileName === '') {
    log.error('installCSI', `Platform: ${os.platform()} is not supported`);
    return false;
  }

  const channels = (regex.exec(deviceName)[1] || '8') as PortCount;
  const userDataPath = app.getPath('userData');
  const reaperPath = settings.get('reaperPath') as string;

  const srcDir = path.join(userDataPath, 'resources', 'Csurf');
  const pluginDir = path.join(reaperPath, 'UserPlugins');
  const csiDir = path.join(reaperPath, 'CSI');

  try {
    log.info('installCSI', 'Creating folder structure');
    settings.set('nbChannels', channels);
     
    createFolder(pluginDir);
    createFolder(csiDir);
    createFolder(path.join(csiDir, 'Surfaces'));
    createFolder(path.join(csiDir, 'Surfaces', 'Midi'));
    createFolder(path.join(csiDir, 'Zones'));
    if (channels === '2') {
      createFolder(path.join(csiDir, 'Zones', 'ReasonusFaderPortV2'));
    } else {
      createFolder(path.join(csiDir, 'Zones', 'ReasonusFaderPort'));
      createFolder(path.join(
        csiDir, 'Zones', 'ReasonusFaderPort', 'AssociatedZones',
      ));
      createFolder(path.join(
        csiDir, 'Zones', 'ReasonusFaderPort', 'NavigationZones',
      ));
    }
  } catch (error) {
    log.error('installCSI', 'Error creating folder structure', error);
    return false;
  }
  
  if (handleSciIni(
    channels, csiDir, midiInput, midiOutput,
  )) {
    addCsiToReaperIni();
  }
    
  copyFile(srcDir, pluginDir, fileName);
  return true;
};