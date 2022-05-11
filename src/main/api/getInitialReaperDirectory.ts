import { app } from 'electron';
import fs from 'fs';
import path from 'path';

export const getInitialReaperDirectory = () => {
  if (fs.existsSync(path.join(app.getPath('appData'), 'REAPER', 'reaper.ini'))) {
    return path.join(app.getPath('appData'), 'REAPER');
  }
  return '';
};