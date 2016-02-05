import React from 'react';

export default class Image extends React.Component {
  render() {
    const { value } = this.props;
    return (
      <img className="ui image mini" src={value.URL} />
    );
  }
};