import fs from 'fs';
import path from 'path';

import { Action } from '../../types';
import { getNewLineChar } from '../../utils/getNewLineChar';
import { settings } from '../../utils/settings';

const actionAlreadyRegistered = (actionPath: string, lines: string[]) => (
  lines.some((line) => line.search(actionPath) !== -1)
);

export const registerAction = (action: Action) => {
  const newLine = getNewLineChar();
  const reaperPath = settings.get('reaperPath') as string;

  try {
    let  reaperKbIni = '';
    let lines: string[] = [];
    if (fs.existsSync(path.join(reaperPath, 'reaper-kb.ini'))) {
      reaperKbIni = fs.readFileSync(path.join(reaperPath, 'reaper-kb.ini')).toString();
      lines = reaperKbIni.split(newLine);
    }

    if (actionAlreadyRegistered(`Reasonus/${action.fileName}`, lines)) {
      return false;
    }
    const filteredLines = lines.filter((line) => line.length > 5);
    filteredLines.push(`SCR 4 0 ${action.actionId} "Reasonus: ${action.displayName}" "Reasonus/${action.fileName}"`);

    fs.writeFileSync(path.join(reaperPath, 'reaper-kb.ini'), filteredLines.join(newLine));
    return true;
  } catch (e) {
    return false;
  }
};