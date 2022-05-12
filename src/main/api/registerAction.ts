import fs from 'fs';
import os from 'os';
import path from 'path';

import { Action } from '../../types';
import { settings } from '../../utils/settings';

const actionAlreadyRegistered = (actionPath: string, lines: string[]) => (
  lines.some((line) => line.search(actionPath) !== -1)
);

export const registerAction = (action: Action) => {
  const newLine = os.platform() === 'win32' ? '\r\n' : '\n';

  const reaperPath = settings.get('reaperPath') as string;
  const actionPath = path.join(
    reaperPath, 'Scripts', 'Reasonus', action.fileName,
  );

  try {
    const reaperKbIni = fs.readFileSync(path.join(reaperPath, 'reaper-kb.ini')).toString();
    const lines = reaperKbIni.split(newLine);

    if (actionAlreadyRegistered(actionPath, lines)) {
      return false;
    }
    const filteredLines = lines.filter((line) => line.length > 5);
    filteredLines.push(`SCR 4 0 REASONUS_${action.displayName.toUpperCase().replace(/\s/g, '_')} "Reasonus: ${action.displayName}" "Reasonus/${action.fileName}"`);

    fs.writeFileSync(path.join(reaperPath, 'reaper-kb.ini'), filteredLines.join(newLine));

    return true;
  } catch (e) {
    return false;
  }
};