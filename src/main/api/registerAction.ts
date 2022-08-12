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
  const reaperKbIniPath = path.join(reaperPath, 'reaper-kb.ini');

  try {
    let  reaperKbIni = '';
    let lines: string[] = [];
    if (fs.existsSync(reaperKbIniPath)) {
      reaperKbIni = fs.readFileSync(reaperKbIniPath).toString();
      lines = reaperKbIni.split(newLine);
    }

    if (actionAlreadyRegistered(`Reasonus/${action.fileName}`, lines)) {
      return false;
    }
    const filteredLines = lines.filter((line) => line.length > 5);
    filteredLines.push(`SCR 4 0 ${action.actionId} "Reasonus: ${action.displayName}" "Reasonus/${action.fileName}"`);

    fs.writeFileSync(reaperKbIniPath, filteredLines.join(newLine));
    return true;
  } catch (e) {
    return false;
  }
};