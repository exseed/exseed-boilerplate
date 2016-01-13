import { Err } from 'exseed';

export class TokenExpiration extends Err {
  constructor(props) {
    super(props, {
      title: 'Token expired',
      message: 'The bearer token has expired',
      status: 401,
    });
  }
};

export class TokenInvalid extends Err {
  constructor(props) {
    super(props, {
      title: 'Invalid token',
      message: 'This token is malformed',
      status: 400,
    });
  }
};

export default function onError({ err, req, res }) {
  switch (err.name) {
    case 'TokenExpiration': {
      // clear the broken token
      res.clearCookie('access_token');
      res
        .status(err.status)
        .json(err.toApiResponse());
      break;
    }
    case 'TokenInvalid': {
      // clear the broken token
      res.clearCookie('access_token');
      res
        .status(err.status)
        .json(err.toApiResponse());
      break;
    }
  }
}