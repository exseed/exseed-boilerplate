import * as views from './views';

export default function routes({ app }) {
  app.post('/api/user/login', views.login);
  app.get('/api/user/logout', views.logout);
  app.get('/api/user', views.listUser);
  app.post('/api/user', views.createUser);
  app.get('/api/user/:id', views.getUser);
  app.get('/api/role/:name', views.getRole);
  app.get('/api/permission', views.listPermissions);
}