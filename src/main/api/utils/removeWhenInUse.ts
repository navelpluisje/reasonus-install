import { IniData } from './readIniData';

export const removeWhenInUse = (iniData: IniData, portIn: string, portOut: string) => {
  let inUseIndex = -1;
  let inUsePage = -1;
  let inUseAssignment = -1;
  let inUseName = '';
  
  iniData.surfaces.forEach((surface, index) => {
    if (inUseIndex === -1 && portIn === surface.portIn && portOut === surface.portOut) {
      inUseIndex = index;
      inUseName = surface.deviceName;
    }
  });

  if (inUseIndex > -1) {
    iniData.surfaces.splice(inUseIndex, 0);
    iniData.pages.forEach((page, index) => {
      page.assignments.forEach((assignment, id) => {
        if (inUseName === assignment.name) {
          inUseAssignment = id;
        }
      });
      if (inUseAssignment > -1) {
        if (page.assignments.length > 1) {
          page.assignments.splice(inUseAssignment, 0);
        }
        inUsePage = index;
      }
    });
    if (inUsePage > -1) {
      iniData.pages.splice(inUsePage, 0);
    }
  }

  return iniData;
};