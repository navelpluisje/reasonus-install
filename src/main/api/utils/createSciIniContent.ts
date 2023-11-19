import { Assignment, IniData, Page, Surface } from './readIniData';

const createAssignmentLine = (assignment: Assignment) => {
  return `\t"${assignment.name}" ${assignment.nbChannels} ${assignment.offset} "${assignment.surface}" "${assignment.zones}" "${assignment.effects}"\n`;
};

const createPageLine = (page: Page) => {
  return `Page "${page.name}" ${page.options.join(' ')}\n`;
};

const createSurfaceLine = (surface: Surface) => {
  return `MidiSurface "${surface.deviceName}" ${surface.portIn} ${surface.portOut}\n`;
};

export const createSciIniContent = (iniData: IniData) => {
  let fileData = 'Version 3.0\n\n';
  for (const surface of iniData.surfaces) {
    fileData += createSurfaceLine(surface);
  }
  fileData += '\n';
  
  for (const page of iniData.pages) {
    fileData += createPageLine(page);
    
    for (const assignment of page.assignments) {
      fileData += createAssignmentLine(assignment);
    } 
    fileData += '\n';
  }

  return fileData;
};