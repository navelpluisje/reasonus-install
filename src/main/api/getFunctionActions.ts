import fs from 'fs';
import path from 'path';

import { FunctionActions, FunctionKeys } from '../../types';
import { settings } from '../../utils/settings';

const regexPreLine = /\/\/\sFunction-Action-([1-8])/;
const regexLine = /.*Reaper\s*([_0-9a-zA-Z]*)/;

export const getFunctionActions = () => {
  const reaperPath = settings.get('reaperPath') as string;
  const filePath = path.join(
    reaperPath, 'CSI', 'Zones', 'Reasonus-FaderPort', 'FP8_Navigators.zon',
  );
  const actions = {} as FunctionActions;

  try {
    if (!fs.existsSync(filePath)) {
      return false;
    }

    const fileContent = fs.readFileSync(filePath).toString();
    const fileLines = fileContent.split('\n');

    let getNextLine = false;
    let actionIndex: string;
    fileLines.forEach((line) => {
      if (getNextLine) {
        getNextLine = false;
        const key = `F${actionIndex}` as FunctionKeys;
        const curVal = line.match(regexLine);

        if (curVal[1]) {
          actions[key] = curVal[1];
        }

      }
      
      const res = line.match(regexPreLine);
      if (res !== null) {
        getNextLine = true;
        actionIndex = res[1];
      }
    });

    settings.set('functionActions', actions);
    return actions;
  } catch (e) {
    return false;
  }
};