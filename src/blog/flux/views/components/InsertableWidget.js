import React from 'react';
import { findDOMNode } from 'react-dom';
import { ItemTypes } from '../../constants';
import { DragSource, DropTarget } from 'react-dnd';
import SortableWidget from './SortableWidget';
import Widget from './Widget';
import WidgetHolder from './WidgetHolder';
import WidgetAction from '../../actions/WidgetAction';

const widgetTarget = {
  drop(props, monitor) {
    const item = monitor.getItem();
    WidgetAction.insertWidget(props.index, {
      type: item.type,
      value: item.value,
    });
  },
};

function collect(connect, monitor) {
  const itemType = monitor.getItemType();
  let item = null;
  if (itemType === ItemTypes.WIDGET_CREATE) {
    item = monitor.getItem();
  }
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    item: item,
    isDragging: !!item,
  };
}

@DropTarget(ItemTypes.WIDGET_CREATE, widgetTarget, collect)
export default class InsertableWidget extends React.Component {
  render() {
    const {
      connectDropTarget,
      isDragging,
      isOver,
      index,
      type,
      value,
    } = this.props;

    return connectDropTarget(
      <div>
        {isOver && 'drop here'}
        <Widget
          type={type}
          value={value} />
        {isOver && 'drop here'}
      </div>
    );
  }
};