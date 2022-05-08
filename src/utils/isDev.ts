export const isDev = () => {
  if ('ELECTRON_IS_DEV' in process.env) {
    return process.env.ELECTRON_IS_DEV === 'true';
  }
  return false;
};