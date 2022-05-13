/* eslint-disable camelcase */
import { Octokit } from '@octokit/rest';
import download from 'download';
import { app } from 'electron';
import fs from 'fs';
import os from 'os';
import path from 'path';

import { settings } from '../../utils/settings';

const octokit = new Octokit({
  auth: process.env.__GITHUB_AUTH_TOKEN__,
});

export const downloadFiles = async () => {
  const userDataPath = app.getPath('userData');
  const resourceVersion = settings.get('resourceVersion');
  const latestRelease = await octokit.repos.getLatestRelease({
    owner: 'navelpluisje',
    repo: 'reasonus-faderport',
  });

  if (resourceVersion === latestRelease.data.tag_name) {
    return;
  }

  try {
    await download(latestRelease.data.assets[0].browser_download_url,
      path.join(userDataPath, 'resources'),
      {
        extract: true,
      });
    settings.set('resourceVersion', latestRelease.data.tag_name);
  } catch (e) {
    console.log('Error while downloading', e);
  }

  if (os.platform() === 'darwin' && fs.existsSync(path.join(userDataPath, 'resources', '__MACOSX'))) {
    fs.rmdirSync(path.join(userDataPath, 'resources', '__MACOSX'), {
      recursive: true,
    });
  }

};