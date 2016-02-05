import React from 'react';

export default class Header extends React.Component {
  render() {
    const { value } = this.props;
    const level = Number(value.level);

    if (1 <= level && level <= 5) {
      const subheader = value.subheader !== '' &&
        <div className="sub header">{value.subheader}</div>;
      return React.createElement(
        `h${level}`,
        { className: 'ui header' },
        value.header, subheader);
    } else {
      return (
        <span>Cannot render header</span>
      );
    }
  }
};