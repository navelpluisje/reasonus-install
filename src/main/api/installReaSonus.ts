import download from 'download';
import fs from 'fs';
import os from 'os';
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

export const installReasonus = (actionId: string) => {
  const reaperPath = settings.get('reaperPath') as string;
  // try {
  //   await download('http://erwin-en-marit.nl/src.zip', 
  //     path.join(__dirname, 'resourceses'),
  //     {
  //       extract: true,
  //     });
  //   console.log('Downloaded resources');
  // } catch (e) {
  //   console.log('Error while downloading', e);
  // }

  // if (os.platform() === 'darwin' && fs.existsSync(path.join(__dirname, 'resources', '__MACOSX'))) {
  //   fs.rmdirSync(path.join(__dirname, 'resources', '__MACOSX'), {
  //     recursive: true,
  //   });
  // }

  // Copy the surface file
  copyFile(path.join(
    __dirname, 'resources', 'src', 'Surfaces', 'Midi',
  ),
  path.join(
    reaperPath, 'CSI', 'Surfaces', 'Midi',
  ),
  'FP8.mst');

  // Modify the files with the always on action
  for (const zoneFile of faderPortZoneFiles) {
    const fileName = path.join(
      __dirname, 'resources', 'src', 'Zones', 'Reasonus-FaderPort', zoneFile,
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