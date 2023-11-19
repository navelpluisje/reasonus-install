import { settings } from '../../utils/settings';

export const getVersionNumber = (version: string) => {
  switch (version) {
    case 'installer':
      return process.env.VERSION || process.env.__VERSION__;
    
    case 'csi':
      return '3.0';
    
    case 'reasonus':
      return settings.get('resourceVersion');

    default:
      return '';
  }
};