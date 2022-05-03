module.exports = {
  makers: [
    {
      config: (arch) => ({
        authors: 'Electron Community',
        certificateFile: process.env.WINDOWS_CODESIGN_FILE,
        certificatePassword: process.env.WINDOWS_CODESIGN_PASSWORD,
        exe: 'reasonus-install.exe',
        // iconUrl:
        //     'https://raw.githubusercontent.com/electron/fiddle/0119f0ce697f5ff7dec4fe51f17620c78cfd488b/assets/icons/fiddle.ico',
        // loadingGif: './assets/loading.gif',
        name: 'reasonus_install',
        noMsi: true,
        setupExe: `reasonus-install-win32-${arch}-setup.exe`,
        // setupIcon: path.resolve(iconDir, 'fiddle.ico'),
      }),
      name: '@electron-forge/maker-squirrel',
      platforms: ['win32'],     
    },
    {
      config: {
        additionalDMGOptions:{
          window: {
            size: {
              height: 490,
              width: 650,
            },
          },
        },
        background: './assets/dmg-background.png',
        format: 'ULFO',
        icon: './assets/app-icon.icns',
        name: 'ReaSonus',
      },
      name: '@electron-forge/maker-dmg',
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: [
        'darwin', 'win32', 'linux',
      ],
    },
    {
      config: {},
      name: '@electron-forge/maker-deb',
    },
    {
      config: {},
      name: '@electron-forge/maker-rpm',
    },
  ],
  packagerConfig: {},  
  plugins: [
    [
      '@electron-forge/plugin-webpack',
      {
        mainConfig: './webpack/webpack.main.config.js',
        renderer: {
          config: './webpack/webpack.renderer.config.js',
          entryPoints: [
            {
              html: './src/renderer/public/index.html',
              js: './src/renderer/index.tsx',
              name: 'home',
            },
          ],
        },
      },
    ],
  ],
};