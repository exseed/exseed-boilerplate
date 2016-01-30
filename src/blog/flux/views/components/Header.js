import React from 'react';

export default class Header extends React.Component {
  render() {
    return (
      <header className="ui inverted vertical masthead center aligned segment">
        <div className="ui text container">
          <h1 className="ui inverted header">
            Exseed
          </h1>
          <h2>A highly extensible nodejs framework.</h2>
          <div className="ui huge primary button">
            Get Started
            <i className="right arrow icon"></i>
          </div>
        </div>
      </header>
    );
  }
};