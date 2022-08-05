import { settings } from '../../utils/settings';

export const getVersionNumber = (version: string) => {
  switch (version) {
    case 'installer':
      return process.env.VERSION;
    
    case 'csi':
      return '1.1 (reasonus-edition)';
    
    case 'reasonus':
      return settings.get('resourceVersion');

    default:

      return '';
  }
};