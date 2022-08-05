export declare global {
	interface Window {
		reasonusAPI: {
      selectFolder: () => Promise<string>;
      getReaperPath: () => Promise<string>;
      installActions: (midiInput: string, midiOutput: string) => Promise<boolean>;
      installReaSonus: () => Promise<void>;
      goToExternal: (url: string) => Promise<void>
      getOS: () => Promise<NodeJS.Platform>
      setReaperPath: (path: string) => Promise<void>,
      copyToClipboard: (text: string) => Promise<viod>
      downloadFiles: () => Promise<viod>
      getInitialReaperPath: () => Promise<string>
      getMidiDevices: () => Promise<MidiDevices>
      getVersionNumber: (version: string) => Promise<string>
      getDevice: () => 'FP2' | 'FP8' | 'FP16'
    };
	}
}

