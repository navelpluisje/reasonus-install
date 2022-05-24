import fs from 'fs';
import path from 'path';

import { FunctionActions, FunctionKeys } from '../../types';
import { settings } from '../../utils/settings';

const regexPreLine = /\/\/\sFunction-Action-([1-8])/;
const regexLine = /.*Reaper\s*([_0-9a-zA-Z]*)/;

export const setFunctionActions = (functionActions: FunctionActions) => {
  const reaperPath = settings.get('reaperPath') as string;
  const filePath = path.join(
    reaperPath, 'CSI', 'Zones', 'ReasonusFaderPort', 'FP8_Navigators.zon',
  );

  try {
    if (!fs.existsSync(filePath)) {
      return;
    }

    const fileContent = fs.readFileSync(filePath).toString();
    const fileLines = fileContent.split('\n');

    let getNextLine = false;
    let actionIndex: string;
    const newLines = fileLines.map((line) => {
      if (getNextLine) {
        getNextLine = false;
        const key = `F${actionIndex}` as FunctionKeys;
        const curVal = line.match(regexLine);

        if (curVal === null || !curVal[1]) {
          return line;
        }

        return line.replace(curVal[1], functionActions[key]);
      }
      
      const res = line.match(regexPreLine);
      if (res !== null) {
        getNextLine = true;
        actionIndex = res[1];
      }
      return line;
    });

    fs.writeFileSync(filePath, newLines.join('\n'));
    return true;
  } catch (e) {
    return false;
  }
};