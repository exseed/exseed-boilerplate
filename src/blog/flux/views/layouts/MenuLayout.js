import React from 'react';
import Menu from '../components/Menu';

export default class MenuLayout extends React.Component {
  render() {
    return (
      <div className="ui container basic segment">
        <div className="ui stackable grid">
          <div className="ui four wide column">
            <Menu />
          </div>
          <div className="ui twelve wide column">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
};