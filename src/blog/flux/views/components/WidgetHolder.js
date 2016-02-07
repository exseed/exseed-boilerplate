import React from 'react';
import { ItemTypes } from '../../constants';
import { DropTarget } from 'react-dnd';
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
export default class WidgetHolder extends React.Component {
  render() {
    const {
      connectDropTarget,
      isDragging,
      isOver,
      item,
      index,
    } = this.props;
    const style = {
      width: '100%',
      display: isDragging? undefined: 'none',
      backgroundColor: isOver? 'green': '#eee',
    };
    return connectDropTarget(
      <div style={style}>
        Drop here
      </div>
    );
  }
};