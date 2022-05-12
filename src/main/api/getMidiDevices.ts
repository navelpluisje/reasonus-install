import fs from 'fs';
import path from 'path';

import { getNewLineChar } from '../../utils/getNewLineChar';
import { settings } from '../../utils/settings';

const midilineRegex = /(?<io>[i|o])(?<type>[a-z])(?<index>[0-9]{1,2})=(?<value>.*)/;

const labels: Record<string, string> = {
  i: 'input',
  n: 'name',
  o: 'output',
  t: 'code',
  x: 'fullName',
};

type MidiData = {
  [io: string]: {
    [index: string]: MidiDevice
  }
}

type MidiLine = {
  io: string;
  type: string;
  index: string;
  value: string;
}

type MidiDevice = {
  name: string,
  code: string,
  id: string,
  fullName: string,
}

export type MidiDevices = {
  in: MidiDevice[]
  out: MidiDevice[]
}

export const getMidiDevices = (): MidiDevices => {
  const newLine = getNewLineChar();
  const reaperPath = settings.get('reaperPath') as string;
  const midiFile = fs.readFileSync(path.join(reaperPath, 'reaper-midihw.ini')).toString();
  const lines = midiFile.split(newLine);

  const result = lines.reduce((acc, line) => {
    const reg = midilineRegex.exec(line);
    if (!reg?.groups || reg.groups.value === '' || reg.groups.value === '0') {
      return acc;
    }

    const groups = reg.groups as MidiLine;
    return {
      ...acc,
      [labels[groups.io]]: {
        ...(acc[labels[groups.io]] || {}),
        [groups.index]: {
          ...(acc[labels[groups.io]]?.[groups.index] || {}),
          [labels[groups.type]]: groups.value,
          id: groups.index,
        },
      },
    };
  }, {} as MidiData);

  return {
    in: Object.values(result.input).filter((device) => device.name === 'Port 1') as MidiDevice[],
    out: Object.values(result.output).filter((device) => device.name === 'Port 1') as MidiDevice[],
  };
};