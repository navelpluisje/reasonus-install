import { app } from 'electron';
import fs from 'fs';
import path from 'path';

import { copyFile } from '../../utils/copyFile';
import { settings } from '../../utils/settings';

// const faderPortZoneFiles = [
const universalFiles = [
  'FP8_Automation.zon',
  'FP8_FX.zon',
  'FP8_FXSlot.zon',
  'FP8_Home.zon',
  'FP8_MixManagement.zon',
  'FP8_NavigatorChannel.zon',
  'FP8_NavigatorMarker.zon',
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

const FP8Files = [
  'FP8_NavigatorBank.zon',
  'FP8_NavigatorMaster.zon',
];

const FP16Files = [
  'FP16_NavigatorBank.zon',
  'FP16_NavigatorMaster.zon',
];

export const installReaSonus = () => {
  let faderPortZoneFiles: string[];
  const nbTracks = settings.get('nbChannels');
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

  if (nbTracks === '16') {
    faderPortZoneFiles = [
      ...FP16Files,
      ...universalFiles,
    ];
  } else {
    faderPortZoneFiles = [
      ...FP8Files,
      ...universalFiles,
    ];
  }

  // Modify the files with the always on action
  for (const zoneFile of faderPortZoneFiles) {
    const fileName = path.join(
      userDataPath, 'resources', 'CSI', 'Zones', 'ReasonusFaderPort', zoneFile,
    );
    if (!fs.existsSync(fileName)) {
      continue;
    }
    const destFileName = path.join(
      reaperPath, 'CSI', 'Zones', 'ReasonusFaderPort', zoneFile,
    );
    const content = fs.readFileSync(fileName).toString();
    fs.writeFileSync(destFileName, content.replace(/%dummyAction%/g, actionId));
  }
};