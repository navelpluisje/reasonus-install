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
  const resourcesTag = process.env.__RESOURCES__;
  const userDataPath = app.getPath('userData');
  const resourceVersion = settings.get('resourceVersion');
  let release;
  
  if (resourcesTag === 'latest') {
    console.log('latest');
    release = await octokit.repos.getLatestRelease({
      owner: 'navelpluisje',
      repo: 'reasonus-faderport',
    });
  } else {
    release = await octokit.repos.getReleaseByTag({
      owner: 'navelpluisje',
      repo: 'reasonus-faderport',
      tag: resourcesTag,
    });    
  }

  if (resourceVersion === release.data.tag_name) {
    return;
  }

  try {
    await download(release.data.assets[0].browser_download_url,
      path.join(userDataPath, 'resources'),
      {
        extract: true,
      });
    settings.set('resourceVersion', release.data.tag_name);
  } catch (e) {
    console.log('Error while downloading', e);
  }

  if (os.platform() === 'darwin' && fs.existsSync(path.join(userDataPath, 'resources', '__MACOSX'))) {
    fs.rmdirSync(path.join(userDataPath, 'resources', '__MACOSX'), {
      recursive: true,
    });
  }

};