import React from 'react';
import { findDOMNode } from 'react-dom';
import { ItemTypes } from '../../constants';
import { DragSource, DropTarget } from 'react-dnd';
import Widget from './Widget';
import WidgetAction from '../../actions/WidgetAction';
import WidgetStore from '../../stores/WidgetStore';

const widgetSource = {
  beginDrag(props) {
    return {
      index: props.index,
    };
  },
};

const widgetCrTarget = {
  hover(props, monitor, component) {
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    const clientOffset = monitor.getClientOffset();
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;
    if (hoverClientY < hoverMiddleY) {
      WidgetAction.updateInsertableHoverDirection(props.index, 'up');
    } else if (hoverClientY > hoverMiddleY) {
      WidgetAction.updateInsertableHoverDirection(props.index, 'down');
    }
  },
  drop(props, monitor, component) {
    WidgetAction.insertWidget(props.index, monitor.getItem());
  },
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
  },
};

@DropTarget(ItemTypes.WIDGET_CREATE, widgetCrTarget, (connect, monitor) => ({
  connectInsertableDropTarget: connect.dropTarget(),
  _isDraggingInsertable: !!monitor.getItem(),
  isOverInsertable: monitor.isOver(),
  clientOffset: monitor.getClientOffset(),
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
}))
@DropTarget(ItemTypes.WIDGET_SORT, widgetTarget, (connect, monitor) => ({
  connectSortableDropTarget: connect.dropTarget(),
  _isDraggingSortable: !!monitor.getItem(),
}))
@DragSource(ItemTypes.WIDGET_SORT, widgetSource, (connect, monitor) => ({
  connectSortableDragSource: connect.dragSource(),
  isDraggingSortable: monitor.isDragging()
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
    const {
      itemType,
      connectSortableDragSource,
      connectSortableDropTarget,
      connectInsertableDropTarget,
    } = this.props;

    const { index, type, value } = this.props;

    let style = {
      backgroundColor: 'white',
    };

    if (itemType === ItemTypes.WIDGET_SORT) {
      // when sortable widget source is dragged
      const {
        isDraggingSortable,
        _isDraggingSortable,
      } = this.props;

      const opacity = isDraggingSortable? 0.3: 1;
      const outline = _isDraggingSortable? '1px dashed gray': 'none';
      style = { ...style, opacity, outline };
    } else if (itemType === ItemTypes.WIDGET_CREATE) {
      // when insertable widget source is dragged
      const {
        isOverInsertable,
        _isDraggingInsertable,
        item,
      } = this.props;

      const {
        insertableHoverDirection,
        insertableHoverIndex,
      } = WidgetStore.getState();

      const outline = '1px dashed gray';
      style = {
        ...style,
        outline,
      };
      if (isOverInsertable) {
        style = {
          ...style,
          boxShadow:
            insertableHoverDirection === 'up'?
            '0 3px 0 green inset, 0 0 0 #000 inset':
            '0 -3px 0 green inset, 0 0 0 #000 inset',
        };
      }
    } else {
      // when nothing is dragged
    }

    return (
      connectInsertableDropTarget(
      connectSortableDragSource(
      connectSortableDropTarget(
        <div style={style}>
          <Widget
            onSave={this._handleWidgetSave}
            onRemove={this._handleWidgetRemove}
            type={type}
            value={value} />
        </div>
      )))
    );
  }
};