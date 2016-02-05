import React from 'react';
import { ItemTypes } from '../../constants';
import { DragSource } from 'react-dnd';
import Widget from './Widget';

const widgetSource = {
  beginDrag(props, monitor) {
    const item = {
      type: props.type,
      value: props.value,
    };
    return item;
  },
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

@DragSource(ItemTypes.WIDGET_CREATE, widgetSource, collect)
export default class SampleWidget extends React.Component {
  render() {
    const { type, fields, value } = this.props;
    const { isDragging, connectDragSource } = this.props;
    const style = {
      opacity: isDragging? 0.5: 1,
    };

    return connectDragSource(
      <div style={style}>
        <Widget
          type={type}
          fields={fields}
          value={value} />
      </div>
    );
  }
};