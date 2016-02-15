import React from 'react';
import { Route, IndexRoute } from 'react-router';

import settings from '../settings';
import AppLayout from './views/layouts/AppLayout';
import ArticleListPage from './views/pages/ArticleListPage';
import ArticleNewPage from './views/pages/ArticleNewPage';
import ArticleDetailPage from './views/pages/ArticleDetailPage';
import AboutPage from './views/pages/AboutPage';
import NotFoundPage from '@core/views/pages/NotFoundPage';

export default (
  <Route path="/blog" component={AppLayout} EXSEED_APP_NAME={settings.name}>
    <IndexRoute component={ArticleListPage} />
    <Route path="new" component={ArticleNewPage} />
    <Route path="article/:id" component={ArticleDetailPage} />
    <Route path="about" component={AboutPage} />
    <Route path="*" component={NotFoundPage} />
  </Route>
);