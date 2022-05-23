import { app } from 'electron';
import fs from 'fs';
import os from 'os';
import path from 'path';

import { copyFile } from '../../utils/copyFile';
import { getNewLineChar } from '../../utils/getNewLineChar';
import { settings } from '../../utils/settings';
import { getMidiDevices } from './getMidiDevices';

const regex = /FP(8|16)/;

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
  
  const ports = regex.exec(deviceName)[1] || '8';

  const userDataPath = app.getPath('userData');
  const newLine = getNewLineChar();
  const reaperPath = settings.get('reaperPath') as string;

  const srcDir = path.join(userDataPath, 'resources', 'Csurf');
  const pluginDir = path.join(reaperPath, 'UserPlugins');
  const csiDir = path.join(reaperPath, 'CSI');

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

  let ini: string;
  if (!fs.existsSync(path.join(csiDir, 'CSI.ini'))) {
    ini = fs.readFileSync(path.join(srcDir, 'CSI.ini')).toString();
  } else {
    ini = fs.readFileSync(path.join(csiDir, 'CSI.ini')).toString();
    ini += `${newLine}MidiSurface "Faderport %ports%" %midiIn% %midiOut% "FP%ports%.mst" "ReasonusFaderport" %ports% %ports% %ports% 0 ${newLine}`;
  }
  ini = ini.replace('%midiIn%', midiInput);
  ini = ini.replace('%midiOut%', midiOutput);
  ini = ini.replace(/%ports%/g, ports);
  
  fs.writeFileSync(path.join(csiDir, 'CSI.ini'), ini);
  
  if (fileName === '') {
    console.error(`Platform: ${os.platform()} is not supported`);
    return false;
  }
  
  copyFile(srcDir, pluginDir, fileName);
  return true;
};