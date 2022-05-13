import {FunctionActions} from '.';

export declare global {
	interface Window {
		reasonusAPI: {
      selectFolder: () => Promise<string>;
      getReaperPath: () => Promise<string>;
      getDummyAction: () => Promise<string>;
      installActions: (midiInput: string, midiOutput: string) => Promise<boolean>;
      installReaSonus: () => Promise<void>;
      getFunctionActions: () => Promise<Record<string, string>>
      saveFunctionActions: (functionActions: FunctionActions) => Promise<boolean>
      goToExternal: (url: string) => Promise<void>
      getOS: () => Promise<NodeJS.Platform>
      setReaperPath: (path: string) => Promise<void>,
      copyToClipboard: (text: string) => Promise<viod>
      downloadFiles: () => Promise<viod>
      getInitialReaperPath: () => Promise<string>
      getMidiDevices: () => Promise<MidiDevices>
      getVersionNumber: (version: string) => Promise<string>
    };
	}
}

