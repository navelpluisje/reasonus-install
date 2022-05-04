import path from 'path';

module.exports = {
  makers: [
    {
      config: (arch) => ({
        authors: 'Navelpluisjes',
        certificateFile: process.env.WINDOWS_CODESIGN_FILE,
        certificatePassword: process.env.WINDOWS_CODESIGN_PASSWORD,
        exe: 'reasonus-faderport.exe',
        // iconUrl:
        //     'https://raw.githubusercontent.com/electron/fiddle/0119f0ce697f5ff7dec4fe51f17620c78cfd488b/assets/icons/fiddle.ico',
        // loadingGif: './assets/loading.gif',
        name: 'reasonus_faderport',
        noMsi: true,
        setupExe: `reasonus-faderport-win32-${arch}-setup.exe`,
        setupIcon: path.resolve(__dirname, 'assets', 'app-icon.ico'),
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
        background: path.resolve(__dirname, 'assets', 'dmg-background.png'),
        format: 'ULFO',
        icon: path.resolve(__dirname, 'assets', 'app-icon.icns'),
        name: 'ReaSonus',
      },
      name: '@electron-forge/maker-dmg',
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: [
        'darwin',
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
  packagerConfig: {
    asar: true,
    executableName: 'reasonus-faderporter',
    icon: path.resolve(
      __dirname, 'assets', 'icons', 'fiddle',
    ),
    name: 'ReaSonus FaderPort',
    osxSign: {
      'entitlements': 'static/entitlements.plist',
      'entitlements-inherit': 'static/entitlements.plist',
      'gatekeeper-assess': false,
      'hardenedRuntime': true,
      'identity': 'Developer ID Application: Felix Rieseberg (LT94ZKYDCJ)',
      'signature-flags': 'library',
    },
    protocols: [
      {
        name: 'Electron Fiddle Launch Protocol',
        schemes: ['electron-fiddle'],
      },
    ],
    win32metadata: {
      CompanyName: 'Navelpluisje',
      OriginalFilename: 'ReaSonus FaderPort',
    },
  },  
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