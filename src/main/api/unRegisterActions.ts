import fs from 'fs';
import path from 'path';

import { getNewLineChar } from '../../utils/getNewLineChar';
import { settings } from '../../utils/settings';

/**
 * Unregister any action not available in th eprovided list
 * 
 * @param actionIds string[]; Array of actionIds to keep
 * @returns boolean; True on success, false otherwise
 */
export const unRegisterActions = (actionIds: string[]) => {
  const newLine = getNewLineChar();
  const reaperPath = settings.get('reaperPath') as string;

  try {
    let  reaperKbIni = '';
    let lines: string[] = [];
    if (fs.existsSync(path.join(reaperPath, 'reaper-kb.ini'))) {
      reaperKbIni = fs.readFileSync(path.join(reaperPath, 'reaper-kb.ini')).toString();
      lines = reaperKbIni.split(newLine);
    }

    const filteredLines = lines.filter((line) => {
      const regexpVal = line.match(/SCR 4 0 ([A-Z0-9_]*) "Reasonus:/);
      if (regexpVal === null) {
        return true;
      }
      return actionIds.includes(regexpVal[1]);
    });

    fs.writeFileSync(path.join(reaperPath, 'reaper-kb.ini'), filteredLines.join(newLine));
    return true;
  } catch (e) {
    return false;
  }
};