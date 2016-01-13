import { renderPath } from 'exseed';

export default function onError({ err, req, res }) {
  switch (err.name) {
    case 'PageNotFound': {
      renderPath('core', '/404', (error, html) => {
        res
          .status(err.status)
          .send(html);
      });
      break;
    }
  }
}

export function onAfterError({ err, req, res }) {
  console.log('==== Uncaught Exception ====');
  console.log(err.stack);
  console.log('============================');
  res.status(err.status || 500);
  res.send('server error');
}