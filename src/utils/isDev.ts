export const isDev = () => {
  if ('ELECTRON_IS_DEVS' in process.env) {
    return process.env.ELECTRON_IS_DEVS === 'true';
  }
  return false;
};