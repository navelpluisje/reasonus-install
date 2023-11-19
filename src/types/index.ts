export type PortCount = '2' | '8' | '16';

export interface Action {
  fileName: string;
  displayName: string;
  actionId: string;
  register: boolean;
  overwrite: boolean;
}