import React from 'react';

export default class Widget extends React.Component {
  render() {
    const { type, value } = this.props;

    return (
      <div>
        {type=='text' && <p>{value}</p>}
        {type=='img' && <img className="ui image mini" src={value.src} />}
      </div>
    );
  }
};

Widget.defaultProps = {
  type: 'text',
  value: 'sample text',
};