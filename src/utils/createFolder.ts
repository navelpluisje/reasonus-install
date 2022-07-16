import fs from 'fs';

export const createFolder = (folderName: string): boolean => {
  try {
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName, {recursive: true});
    }
    return true;
  } catch {
    return false;
  }

};