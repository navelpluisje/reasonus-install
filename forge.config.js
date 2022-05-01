module.exports = {
  makers: [
    {
      config: {
        name: 'reasonus_install',
      },
      name: '@electron-forge/maker-squirrel',
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