export type FunctionKeys = 'F1'|'F2'|'F3'|'F4'|'F5'|'F6'|'F7'|'F8';

export type FunctionActions = {
  [functionKey in FunctionKeys]: string;
}

export type PortCount = '8' | '16';

export interface Action {
  fileName: string;
  displayName: string;
  actionId: string;
  register: boolean;
}