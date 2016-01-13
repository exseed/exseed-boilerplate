import React from 'react';
import { Route, IndexRoute } from 'react-router';

import settings from '../settings';
import AppLayout from './views/layouts/AppLayout';
import NotFoundPage from './views/pages/NotFoundPage';

export default (
  <Route component={AppLayout} EXSEED_APP_NAME={settings.name}>
    <Route path="*" component={NotFoundPage} />
  </Route>
);