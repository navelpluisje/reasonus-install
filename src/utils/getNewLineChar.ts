import os from 'os';

export const getNewLineChar = () => (os.platform() === 'win32' ? '\r\n' : '\n');
