import React from 'react';

import connectToStores from 'alt-utils/lib/connectToStores';
import UserStore from '../../stores/UserStore';
import UserActions from '../../actions/UserActions';

import Input from '../../views/components/Input';

@connectToStores
export default class LoginPage extends React.Component {
  static getStores() {
    return [UserStore];
  }

  static getPropsFromStores() {
    return UserStore.getState();
  }

  _handleSubmit(e) {
    e.preventDefault();
    UserActions.login({
      username: this.refs.username.getValue(),
      password: this.refs.password.getValue(),
    });
  }

  render() {
    return <div className="container">
      <div className="page-header">
        <h1>Login</h1>
      </div>

      <form
        className="form-horizontal"
        onSubmit={this._handleSubmit.bind(this)}>

        <Input
          ref="username"
          label="Username"
          placeholder="username" />

        <Input
          ref="password"
          label="Password"
          type="password"
          placeholder="password" />

        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <button type="submit" className="btn btn-default">Login</button>
          </div>
        </div>
      </form>
    </div>;
  }
};