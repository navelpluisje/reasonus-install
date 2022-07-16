import { app } from 'electron';
import fs from 'fs';
import path from 'path';

import { copyFile } from '../../utils/copyFile';
import { fileExists } from '../../utils/fileExists';
import { settings } from '../../utils/settings';

export const installReaSonus = () => {
  let faderPortZoneFiles: string[];
  const nbChannels = settings.get('nbChannels');
  const userDataPath = app.getPath('userData');
  const reaperPath = settings.get('reaperPath') as string;
  const surfacePath = path.join(
    userDataPath, 'resources', 'CSI', 'Surfaces', 'Midi',
  );
  const surfaceDest = path.join(
    reaperPath,  'CSI', 'Surfaces', 'Midi',
  );
  const zonesPath = path.join(
    userDataPath, 'resources', 'CSI', 'Zones', 'ReasonusFaderPort',
  );
  const zonesDest = path.join(
    reaperPath,  'CSI', 'Zones', 'ReasonusFaderPort',
  );
  const zoneFilesList: Record<string, string[]> = JSON.parse(fs.readFileSync(path.join(zonesPath, 'zonefiles.json')).toString());

  /**
   * Check the channel count, Ccopy the right surface file and set the right zone files to copy
   */
  if (nbChannels === '16') {
    copyFile(surfacePath, surfaceDest, 'FP16.mst');
    faderPortZoneFiles = zoneFilesList.FP16;
  } else if (nbChannels === '8') {
    copyFile(surfacePath, surfaceDest, 'FP8.mst');
    faderPortZoneFiles = zoneFilesList.FP8;
  } else {
    copyFile(surfacePath, surfaceDest, 'FP2.mst');
    faderPortZoneFiles = zoneFilesList.FP2;
  }

  /**
   * Copy the zone files.
   */
  for (const zoneFile of faderPortZoneFiles) {
    const fileName = path.join(userDataPath, zoneFile);
    if (!fileExists(fileName)) {
      continue;
    }
    copyFile(zonesPath, zonesDest, zoneFile);
  }
};