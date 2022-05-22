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
  const deviceName = midiDevices.in.find(((device) => device.id === midiInput)).fullName;
  const ports = regex.exec(deviceName)[1] || '8';

  const userDataPath = app.getPath('userData');
  const newLine = getNewLineChar();
  const reaperPath = settings.get('reaperPath') as string;

  const srcDir = path.join(userDataPath, 'resources', 'Csurf');
  const pluginDir = path.join(reaperPath, 'UserPlugins');
  const iniDir = path.join(reaperPath, 'CSI');

  if (!fs.existsSync(pluginDir)) {
    fs.mkdirSync(pluginDir);
  }

  if (!fs.existsSync(iniDir)) {
    fs.mkdirSync(path.join(iniDir, 'Surfaces', 'Midi'), { recursive: true });
    fs.mkdirSync(path.join(iniDir, 'Zones', 'Reasonus-FaderPort'), { recursive: true });
  }

  let ini: string;
  if (!fs.existsSync(path.join(iniDir, 'CSI.ini'))) {
    ini = fs.readFileSync(path.join(srcDir, 'CSI.ini')).toString();
  } else {
    ini = fs.readFileSync(path.join(iniDir, 'CSI.ini')).toString();
    ini += `${newLine}MidiSurface "Faderport %ports%" %midiIn% %midiOut% "FP%ports%.mst" "Reasonus-Faderport8" %ports% %ports% %ports% 0 ${newLine}`;
  }
  ini = ini.replace('%midiIn%', midiInput);
  ini = ini.replace('%midiOut%', midiOutput);
  ini = ini.replace(/%ports%/g, ports);
  
  fs.writeFileSync(path.join(iniDir, 'CSI.ini'), ini);
  
  if (os.platform() === 'darwin') {
    fileName = 'reaper_csurf_integrator.dylib';
  }
  if (os.platform() === 'win32') {
    fileName = 'reaper_csurf_integrator.dll';
  }

  if (fileName === '') {
    console.error(`Platform: ${os.platform()} is not supported`);
    return false;
  }
  
  copyFile(srcDir, pluginDir, fileName);
  return true;
};