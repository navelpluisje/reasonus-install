import fs from 'fs';
import path from 'path';

export const copyFile = (srcDir: string, destDir: string, fileName: string): boolean => {
  try {
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, {recursive: true});
    }
    if (fs.existsSync(path.join(srcDir, fileName))) {
      fs.copyFileSync( path.join(srcDir, fileName), path.join(destDir, fileName));
    }
    return true;
  } catch {
    return false;
  }

};