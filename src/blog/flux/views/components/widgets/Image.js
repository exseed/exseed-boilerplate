import React from 'react';
import classNames from 'classnames';

export default class Image extends React.Component {
  render() {
    const { value } = this.props;
    const imgClass = classNames(
      'ui',
      'image',
      value.size, {
        'centered': value.align === 'center',
      },
    );

    return (
      <img className={imgClass} src={value.URL} />
    );
  }
};