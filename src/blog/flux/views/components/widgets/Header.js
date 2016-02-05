import React from 'react';

export default class Header extends React.Component {
  render() {
    const { value } = this.props;
    const level = Number(value.level);

    if (1 <= level && level <= 5) {
      return React.createElement(
        `h${level}`,
        {
          className: 'ui header',
        },
        value.content);
    } else {
      return (
        <span>Cannot render header</span>
      );
    }
  }
};