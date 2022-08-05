// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  makers: [
    {
      config: (arch) => ({
        authors: 'Navelpluisje',
        exe: 'reasonus-faderport.exe',
        iconUrl:
            'https://raw.githubusercontent.com/navelpluisje/reasonus-install/main/assets/app-icon.ico',
        name: 'reasonus_faderport',
        noMsi: true,
        setupExe: `reasonus-faderport-win32-${arch}-setup.exe`,
        setupIcon: path.resolve(__dirname, 'assets', 'app-icon.ico'),
      }),
      name: '@electron-forge/maker-squirrel',
      platforms: ['win32'],     
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
    executableName: 'reasonus-faderport',
    icon: path.resolve(__dirname, 'assets',  'app-icon'),
    name: 'ReaSonus FaderPort',
    protocols: [
      {
        name: 'ReaSonus FaderPort Launch Protocol',
        schemes: ['reasonus-faderport'],
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