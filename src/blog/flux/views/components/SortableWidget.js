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
  _isDragging: !!monitor.getItem(),
}))
@DragSource(ItemTypes.WIDGET_SORT, widgetSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
}))
export default class SortableWidget extends React.Component {
  constructor(state) {
    super(state);
    this._handleWidgetRemove = this._handleWidgetRemove.bind(this);
    this._handleWidgetSave = this._handleWidgetSave.bind(this);
  }

  _handleWidgetRemove() {
    const { index } = this.props;
    const confirmDelete = confirm('Are you sure?');
    if (confirmDelete) {
      WidgetAction.removeWidget(index);
    }
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
      _isDragging,
      index,
      type,
      value
    } = this.props;

    const opacity = isDragging? 0.3: 1;
    const outline = _isDragging? '1px dashed gray': 'none';

    return connectDragSource(connectDropTarget(
      <div style={{ ...style.widgetContainer, opacity, outline }}>
        <Widget
          onSave={this._handleWidgetSave}
          onRemove={this._handleWidgetRemove}
          type={type}
          value={value} />
      </div>
    ));
  }
};