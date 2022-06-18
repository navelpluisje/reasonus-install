import fs from 'fs';
import path from 'path';

import { getNewLineChar } from '../../../utils/getNewLineChar';

const csiLineRegex = /MidiSurface\s".*"\s(?<midiIn>[0-9]{1,2})\s(?<midiOut>[0-9]{1,2})\s.*\s([0-9]{1,2})\s([0-9]{1,2})\s([0-9]{1,2})\s([0-9]{1,2})/;

export const handleSciIni = (
  nbChannels: '2' | '8' | '16', 
  csiDir: string, 
  srcDir: string, 
  midiInput: string, 
  midiOutput: string,
) => {
  const newLine = getNewLineChar();
  const newCsiLine = `MidiSurface "Faderport ${nbChannels}" ${midiInput} ${midiOutput} "FP${nbChannels}.mst" "ReasonusFaderPort" ${nbChannels} ${nbChannels} ${nbChannels} 0`;

  try {
    let ini: string;
    if (!fs.existsSync(path.join(csiDir, 'CSI.ini'))) {
      ini = fs.readFileSync(path.join(srcDir, 'CSI.ini')).toString();
    } else {
      ini = fs.readFileSync(path.join(csiDir, 'CSI.ini')).toString();
    }
  
    const iniLines = ini.split(newLine);
    const portTakenLine = iniLines.findIndex((line) => {
      const res = csiLineRegex.exec(line);
      if (res?.groups && res?.groups.midiIn === midiInput || res?.groups.midiOut === midiOutput) {
        return true;
      }
      return false;
    });
  
    if (portTakenLine !== -1) {
      iniLines[portTakenLine] = newCsiLine;
    } else {
      iniLines[iniLines.length] = newCsiLine;
    }
  
    fs.writeFileSync(path.join(csiDir, 'CSI.ini'), iniLines.join(newLine));
    return true;
  } catch {
    return false;
  }
};