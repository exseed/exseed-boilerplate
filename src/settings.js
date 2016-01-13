import path from 'path';
import sailsDisk from 'sails-disk';

export default {
  installedApps: [
    './exseed.core',
    './exseed.contrib.basic',
    './exseed.contrib.user',
    // './todoapp',
  ],
  db: {
    development: {
      adapters: {
        disk: sailsDisk,
      },
      connections: {
        default: {
          adapter: 'disk',
          filePath: path.join(__dirname, '../db/development.'),
        },
      },
    },
    test: {
      adapters: {
        disk: sailsDisk,
      },
      connections: {
        default: {
          adapter: 'disk',
          filePath: path.join(__dirname, '../db/test.'),
        },
      },
    },
    production: {
      adapters: {
        disk: sailsDisk,
      },
      connections: {
        default: {
          adapter: 'disk',
          filePath: path.join(__dirname, '../db/production.'),
        },
      },
    },
  },
};