import React from 'react';

export default class Header1 extends React.Component {
  render() {
    const { value } = this.props;
    return (
      <h1 className="ui header">{value.content}</h1>
    );
  }
};