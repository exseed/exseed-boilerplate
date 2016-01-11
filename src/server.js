import { env, app } from 'exseed';
import settings from './settings';

if (env.development) {
  require('source-map-support').install();
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`HTTP server listening on port ${PORT}`);
});