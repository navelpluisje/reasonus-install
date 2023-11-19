import { getNewLineChar } from '../../../utils/getNewLineChar';
import { log } from '../../../utils/log';
import { readAssignment } from './readAssignment';
import { readPage } from './readPage';
import { readSurface } from './readSurface';

export type Surface = {
  deviceName: string;
  portIn: string;
  portOut: string;
}; 

type SurfaceV1 = {
  deviceName: string;
  portIn: string;
  portOut: string;
  nbPorts: string,
  offset: string,
  surface: string,
  zones: string,
}; 

export type Assignment = {
  name: string,
  nbChannels: string,
  offset: string,
  surface: string,
  zones: string,
  effects: string
}

export type Page = {
  name: string;
  options: string[],
  assignments: Assignment[]
}

export type IniData = {
  pages: Page[];
  surfaces: Surface[];
}

const readVersion3Data = (lines: string[]) => {
  log.info('readIniData', 'ReadVersion3Data');
  const iniData: IniData = {
    pages: [],
    surfaces: [],
  };

  for (const line of lines) {
    log.warn('readIniData', 'ReadVersion3Data process line', line);
    if (line.trim().startsWith('MidiSurface')) {
      iniData.surfaces.push(readSurface<Surface>(line));
    } else if (line.trim().startsWith('Page')) {
      const pageData: Page = {
        ...readPage(line),
        assignments: [],
      };
      iniData.pages.push(pageData);
    } else if (!line.trim().startsWith('Version')) {
      const lastIndex = iniData.pages.length - 1;
      const data = readAssignment(line);
      iniData.pages[lastIndex].assignments.push(data);
    }
  }
  return iniData;
};

const readVersion1Data = (lines: string[]) => {
  log.info('readIniData', 'readVersion1Data');
  const iniData: IniData = {
    pages: [],
    surfaces: [],
  };

  for (const line of lines) {
    log.warn('readIniData', 'ReadVersion1Data process line ', line);
    if (line.trim().startsWith('MidiSurface')) {
      const lastIndex = iniData.pages.length - 1;
      const surfaceData = readSurface<SurfaceV1>(line);
      
      iniData.surfaces.push({
        deviceName: surfaceData.deviceName,
        portIn: surfaceData.portIn,
        portOut: surfaceData.portOut,
      });

      iniData.pages[lastIndex].assignments.push({
        effects: surfaceData.zones,
        name: surfaceData.deviceName,
        nbChannels: surfaceData.nbPorts,
        offset: surfaceData.offset,
        surface: surfaceData.surface,
        zones: surfaceData.zones,
      });
    } else if (line.trim().startsWith('Page')) {
      const pageData: Page = {
        ...readPage(line),
        assignments: [],
      };
      iniData.pages.push(pageData);
    }
  }
  return iniData;
};



export const readIniData = (iniContent: string) => {
  log.info('readIniData', 'readIniData');
  const newLine = getNewLineChar();
  const lines = iniContent.split(newLine).filter((line) => !!line && line !== '');

  if (lines[0].startsWith('Version')) {
    return readVersion3Data(lines);
  }
  return readVersion1Data(lines);
};