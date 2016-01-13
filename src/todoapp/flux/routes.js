import React from 'react';
import { Route, IndexRoute } from 'react-router';

import settings from '../settings';
import MainPage from './views/pages/MainPage';

export default (
  <Route path="/todo" component={MainPage} EXSEED_APP_NAME={settings.name} />
);