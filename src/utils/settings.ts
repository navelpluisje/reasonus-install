import { app } from 'electron';
import fs from 'fs';
import path from 'path';

import { FunctionActions } from '../types';

interface AppSettings {
  reaperPath: string;
  dummyAction: string;
  functionActions: FunctionActions;
}

export class Settings {
  data: AppSettings;
  path: string;

  constructor() {
    const userDataPath = app.getPath('userData');
    this.path = path.join(userDataPath, 'settings.json');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.data = {};

    if (!fs.existsSync(this.path)) {
      fs.writeFileSync(this.path, JSON.stringify({}));
    } else {
      this.data = parseDataFile(this.path);
    }
    
  }
  
  get(key: keyof AppSettings) {
    return this.data[key];
  }
  
  set<T>(key: keyof AppSettings, val: T) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.data[key] = val;
    fs.writeFileSync(this.path, JSON.stringify(this.data));
  }
}

export const settings = new Settings();

function parseDataFile(filePath: string) {
  try {
    return JSON.parse(fs.readFileSync(filePath).toString());
  } catch (error) {
    return {};
  }
}

