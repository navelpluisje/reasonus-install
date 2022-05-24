import fs from 'fs';
import ini from 'ini';
import path from 'path';

import { settings } from '../../../utils/settings';

export const addCsiToReaperIni = () => {
  const reaperPath = settings.get('reaperPath') as string;

  try {
    const reaperIni = ini.decode(fs.readFileSync(path.join(reaperPath, 'reaper.ini'), 'utf8'));
    const index = parseInt(reaperIni.REAPER.csurf_cnt, 10) || 0;

    const hasCSI = new Array(index).fill(undefined).some(((_, i) => {
      if ((reaperIni.REAPER[`csurf_${i}`] as string).indexOf('CSI') !== -1) {
        return true;
      }
      return false;
    }));

    if (!hasCSI) {
      reaperIni.REAPER[`csurf_${index}`] = 'CSI 0 0';
      // eslint-disable-next-line camelcase
      reaperIni.REAPER.csurf_cnt = `${index + 1}`;
    
      fs.writeFileSync(path.join(reaperPath, 'reaper.ini'), ini.encode(reaperIni));
    }

    return true;
  } catch {
    return false;
  }
};