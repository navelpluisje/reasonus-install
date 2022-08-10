import fs from 'fs';
import ini from 'ini';
import path from 'path';

import { settings } from '../../../utils/settings';

const cleanupUnusedCsiLines = (ini: any) => {
  const regex = /^csurf_([0-9]{1,3})/;
  let modified = false;

  const maxIndex = parseInt(ini.REAPER.csurf_cnt, 10) - 1 || 0;
  const reaperIni =  Object.entries(ini.REAPER).reduce((acc, [key, value]) => {
    const match = key.match(regex);
    if (parseInt(match?.[1] || '0') > maxIndex) {
      return acc;
    }
    modified = true;
    return {
      ...acc,
      [key]: value,
    };
  }, {});

  return {
    modified: modified,
    reaperIni: {
      ...ini,
      REAPER: reaperIni,
    },
  }
  ;
};


export const addCsiToReaperIni = () => {
  const reaperPath = settings.get('reaperPath') as string;

  try {
    const rawIni = ini.decode(fs.readFileSync(path.join(reaperPath, 'reaper.ini'), 'utf8'));
    const index = parseInt(rawIni.REAPER.csurf_cnt, 10) || 0;

    const {reaperIni, modified} = cleanupUnusedCsiLines(rawIni) as typeof rawIni;

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
    if (modified) {
      fs.writeFileSync(path.join(reaperPath, 'reaper.ini'), ini.encode(reaperIni));
    }

    return true;
  } catch {
    return false;
  }
};