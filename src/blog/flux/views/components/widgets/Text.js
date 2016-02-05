import React from 'react';

export default class Text extends React.Component {
  render() {
    const { value } = this.props;
    return (
      <p>
        {value.content.split('\n').map((line, index) =>
          <span key={index}>{line}<br /></span>)}
      </p>
    );
  }
};