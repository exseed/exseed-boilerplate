export default function routes({ app }) {
  app.post('/bodyparser', (req, res) => {
    res.json(req.body);
  });

  app.get('/cookie_example/set', (req, res) => {
    res.cookie('cookie_example', 'this is some cookie');
    res.send(
      '`cookie_example` was set, and here is your cookie:<br>' +
      JSON.stringify(req.cookies));
  });

  app.get('/cookie_example/unset', (req, res) => {
    res.clearCookie('cookie_example');
    res.send(
      '`cookie_example` was unset, and here is your cookie:<br>' +
      JSON.stringify(req.cookies));
  });

  app.get('/error', (req, res) => {
    throw new Error('make error in purpose');
  });

  // app.get('/module/user', (req, res) => {
  //   let userModules = load('user');
  //   res.json(userModules);
  // });
}