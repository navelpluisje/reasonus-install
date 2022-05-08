import fs from 'fs';
import os from 'os';
import path from 'path';

import { copyFile } from '../../utils/copyFile';
import { settings } from '../../utils/settings';


export const installCSI = () => {
  let fileName = '';
  const newLine = os.platform() === 'win32' ? '\r\n' : '\n';
  const reaperPath = settings.get('reaperPath') as string;

  const srcDir = path.join(__dirname, 'resources', 'Csurf');
  const pluginDir = path.join(reaperPath, 'UserPlugins');
  const iniDir = path.join(reaperPath, 'CSI');

  if (!fs.existsSync(pluginDir)) {
    fs.mkdirSync(pluginDir);
  }

  if (!fs.existsSync(iniDir)) {
    fs.mkdirSync(path.join(iniDir, 'Surfaces', 'Midi'), { recursive: true });
    fs.mkdirSync(path.join(iniDir, 'Zones', 'Reasonus-FaderPort'), { recursive: true });
  }

  if (!fs.existsSync(path.join(iniDir, 'CSI.ini'))) {
    copyFile(srcDir, iniDir, 'CSI.ini');
  } else {
    let ini = fs.readFileSync(path.join(iniDir, 'CSI.ini')).toString();
    ini += `${newLine}MidiSurface "Faderport 8" 5 5 "FP8.mst" "Reasonus-Faderport8" 8 8 8 0 ${newLine}`;
    fs.writeFileSync(path.join(iniDir, 'CSI.ini'), ini);
  }

  
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