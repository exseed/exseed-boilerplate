import React from 'react';
import { Route, IndexRoute } from 'react-router';

import settings from '../settings';
import AppLayout from './views/layouts/AppLayout';
import HomePage from './views/pages/HomePage';
import AboutPage from './views/pages/AboutPage';
import NotFoundPage from '@core/views/pages/NotFoundPage';

export default (
  <Route path="/" component={AppLayout} EXSEED_APP_NAME={settings.name}>
    <IndexRoute component={HomePage} />
    <Route path="about" component={AboutPage} />
    <Route path="*" component={NotFoundPage} />
  </Route>
);