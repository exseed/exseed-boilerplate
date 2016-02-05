import React from 'react';
import { findDOMNode } from 'react-dom';
import { ItemTypes } from '../../constants';
import { DragSource, DropTarget } from 'react-dnd';
import Widget from './Widget';
import WidgetAction from '../../actions/WidgetAction';

const widgetSource = {
  beginDrag(props) {
    return {
      index: props.index,
    };
  }
};

const widgetTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    WidgetAction.moveWidget(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  }
};

@DropTarget(ItemTypes.WIDGET_SORT, widgetTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
}))
@DragSource(ItemTypes.WIDGET_SORT, widgetSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
}))
export default class SortableWidget extends React.Component {
  constructor(state) {
    super(state);
    this._handleRemoveClick = this._handleRemoveClick.bind(this);
    this._handleWidgetSave = this._handleWidgetSave.bind(this);
  }

  _handleRemoveClick() {
    WidgetAction.removeWidget(this.props.index);
  }

  _handleWidgetSave(newValue) {
    const { index } = this.props;
    WidgetAction.updateValue(index, newValue);
  }

  render() {
    const style = {
      moveIcon: {
        cursor: 'move',
      },
      widgetContainer: {
        backgroundColor: 'white',
      },
    };

    const {
      connectDragSource,
      connectDropTarget,
      isDragging,
      index,
      type,
      fields,
      value
    } = this.props;

    const opacity = isDragging? 0.3: 1;
    const outline = isDragging? '1px dashed gray': 'none';

    return connectDragSource(connectDropTarget(
      <div style={{ ...style.widgetContainer, opacity, outline }}>
        <Widget
          onSave={this._handleWidgetSave}
          type={type}
          fields={fields}
          value={value} />
      </div>
    ));
  }
};