import { app } from 'electron';
import fs from 'fs';
import os from 'os';
import path from 'path';

import { PortCount } from '../../types';
import { copyFile } from '../../utils/copyFile';
import { settings } from '../../utils/settings';
import { getMidiDevices } from './getMidiDevices';
import { addCsiToReaperIni } from './utils/addCsiToReaperIni';
import { handleSciIni } from './utils/handleCsiIni';

const regex = /FP(2|8|16)/;

export const installCSI = (midiInput: string, midiOutput: string) => {
  let fileName = '';
  const midiDevices = getMidiDevices();
  let deviceName: string;

  if (os.platform() === 'darwin') {
    deviceName = midiDevices.in.find(((device) => device.id === midiInput)).fullName;
    fileName = 'reaper_csurf_integrator.dylib';
  } else {
    deviceName = midiDevices.in.find(((device) => device.id === midiInput)).name;
    fileName = 'reaper_csurf_integrator.dll';
  }

  if (fileName === '') {
    console.error(`Platform: ${os.platform()} is not supported`);
    return false;
  }

  const channels = (regex.exec(deviceName)[1] || '8') as PortCount;
  const userDataPath = app.getPath('userData');
  const reaperPath = settings.get('reaperPath') as string;

  const srcDir = path.join(userDataPath, 'resources', 'Csurf');
  const pluginDir = path.join(reaperPath, 'UserPlugins');
  const csiDir = path.join(reaperPath, 'CSI');

  settings.set('nbChannels', channels);
  
  if (!fs.existsSync(pluginDir)) {
    fs.mkdirSync(pluginDir);
  }

  if (!fs.existsSync(csiDir)) {
    fs.mkdirSync(csiDir);
    fs.mkdirSync(path.join(csiDir, 'Surfaces'));
    fs.mkdirSync(path.join(csiDir, 'Surfaces', 'Midi'));
    fs.mkdirSync(path.join(csiDir, 'Zones'));
    fs.mkdirSync(path.join(csiDir, 'Zones', 'ReasonusFaderPort'));
  }

  if (handleSciIni(
    channels, csiDir, srcDir, midiInput, midiOutput,
  )) {
    addCsiToReaperIni();
  }
  
  copyFile(srcDir, pluginDir, fileName);
  return true;
};