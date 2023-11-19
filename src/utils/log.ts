import chalk from 'chalk';

import { isDev } from './isDev';

const info = (file: string, message: string, ...args: any[]) => {
  if (isDev()) {
    console.log(`${chalk.bgBlue.white(`  [ ${file} ]  `)} ${message}`, ...args);
  }
};

const warn = (file: string, message: string, ...args: any[]) => {
  if (isDev()) {
    console.log(`${chalk.bgYellow.black(`  [ ${file} ]  `)} ${message}`, ...args);
  }
};

const error = (file: string, message: string, ...args: any[]) => {
  if (isDev()) {
    console.log(`${chalk.bgRed.white(`  [ ${file} ]  `)} ${message}`, ...args);
  }
};

export const log = {
  error,
  info,
  warn,
};