import {FunctionActions} from '.';

export declare global {
	interface Window {
		reasonusAPI: {
      selectFolder: () => Promise<string>;
      getReaperPath: () => Promise<string>;
      getDummyAction: () => Promise<string>;
      copyBaseActions: () => Promise<boolean>;
      installReaSonus: (dummyId: string) => Promise<void>;
      getFunctionActions: () => Promise<Record<string, string>>
      saveFunctionActions: (functionActions: FunctionActions) => Promise<boolean>
      goToExternal: (url: string) => Promise<void>
      getOS: () => Promise<NodeJS.Platform>
      setReaperPath: (path: string) => Promise<void>,

    };
	}
}

