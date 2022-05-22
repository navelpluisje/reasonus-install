import { app } from 'electron';
import fs from 'fs';
import path from 'path';

import { copyFile } from '../../utils/copyFile';
import { settings } from '../../utils/settings';

const faderPortZoneFiles = [
  'FP8_Automation.zon',
  'FP8_Channel.zon',
  'FP8_FX.zon',
  'FP8_FXSlot.zon',
  'FP8_Home.zon',
  'FP8_MixManagement.zon',
  'FP8_NavigatorBank.zon',
  'FP8_NavigatorChannel.zon',
  'FP8_NavigatorMarker.zon',
  'FP8_NavigatorMaster.zon',
  'FP8_NavigatorMetronome.zon',
  'FP8_Navigators.zon',
  'FP8_NavigatorScroll.zon',
  'FP8_NavigatorSection.zon',
  'FP8_NavigatorZoom.zon',
  'FP8_Panning.zon',
  'FP8_SelectedTrackReceives.zon',
  'FP8_SelectedTrackSend.zon',
  'FP8_TrackReceiveSlot.zon',
  'FP8_TracksByName.zon',
  'FP8_TrackSendSlot.zon',
  'FP8_Transport.zon',
];

export const installReaSonus = () => {
  const actionId = '_REASONUS_ALWAYS_ON';
  const userDataPath = app.getPath('userData');
  const reaperPath = settings.get('reaperPath') as string;
  const surfacePath = path.join(
    userDataPath, 'resources', 'CSI', 'Surfaces', 'Midi',
  );
  const surfaceDest = path.join(
    reaperPath,  'CSI', 'Surfaces', 'Midi',
  );

  // Copy the surface file
  copyFile(surfacePath, surfaceDest, 'FP8.mst');

  copyFile(surfacePath, surfaceDest, 'FP16.mst');

  // Modify the files with the always on action
  for (const zoneFile of faderPortZoneFiles) {
    const fileName = path.join(
      userDataPath, 'resources', 'CSI', 'Zones', 'Reasonus-FaderPort', zoneFile,
    );
    if (!fs.existsSync(fileName)) {
      continue;
    }
    const destFileName = path.join(
      reaperPath, 'CSI', 'Zones', 'Reasonus-FaderPort', zoneFile,
    );
    const content = fs.readFileSync(fileName).toString();
    fs.writeFileSync(destFileName, content.replace(/%dummyAction%/g, actionId));
  }
};