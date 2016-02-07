import React from 'react';
import classNames from 'classnames';

export default class Image extends React.Component {
  render() {
    const { value } = this.props;
    const imgClass = classNames(
      'ui',
      'image',
      value.size,
      { centered: value.center },
      { bordered: value.border },
      { rounded: value.round },
      { circular: value.circular },
    );

    return (
      <img className={imgClass} src={value.URL} />
    );
  }
};