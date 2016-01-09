import { run } from 'exseed';
import settings from './settings';

if (process.env.NODE_ENV === 'development') {
  require('source-map-support').install();
}

run(__dirname, settings, (err, models, port) => {
  if (err) {
    throw err;
  }
  console.log(`HTTP server listening on port ${port}`);
});