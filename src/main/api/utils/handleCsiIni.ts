import fs from 'fs';
import path from 'path';

import { log } from '../../../utils/log';
import { createSciIniContent } from './createSciIniContent';
import { IniData, Page, readIniData, Surface } from './readIniData';
import { removeWhenInUse } from './removeWhenInUse';

export const handleSciIni = (
  channels: '2' | '8' | '16', 
  csiDir: string, 
  midiInput: string, 
  midiOutput: string,
) => {
  log.info('handleSciIni', 'started');
  let hasIni = false;
  let iniData: IniData;
  const version = channels === '2' ? 'v2' : channels;
  const nbChannels = channels === '2' ? '1' : channels;
  const newPage: Page = {
    assignments: [{
      effects: 'ReasonusFaderPort',
      name: `FaderPort ${version}`,
      nbChannels: nbChannels,
      offset: '0',
      surface: `FP${channels}.mst`,
      zones: 'ReasonusFaderPort',
    }],
    name: `ReaSonus FaderPort ${version}`,
    options: ['NoSynchPages', 'UseScrollLink', 'UseScrollSynch'],
  };
  const newSurface: Surface = {
    deviceName: `Faderport ${version}`,
    portIn: midiInput,
    portOut: midiOutput,
  };

  try {
    log.info('handleSciIni', 'Creating the CSI.ini file');
    if (fs.existsSync(path.join(csiDir, 'CSI.ini'))) {
      hasIni = true;
      fs.copyFileSync(path.join(csiDir, 'CSI.ini'), path.join(csiDir, 'CSI.ini.bu'));
      iniData = readIniData(fs.readFileSync(path.join(csiDir, 'CSI.ini')).toString());
    }
  
    if (hasIni) {
      log.info('handleSciIni', 'Check if midi device is already in use');
      iniData = removeWhenInUse(iniData, midiInput, midiOutput);
    } else {
      iniData = {
        pages: [newPage],
        surfaces: [newSurface],
      };
    }
  
    fs.writeFileSync(path.join(csiDir, 'CSI.ini'), createSciIniContent(iniData));
    return true;
  } catch (error) {
    log.error('handleSciIni', 'Creating the CSI.ini file', error);
    return false;
  }
};
