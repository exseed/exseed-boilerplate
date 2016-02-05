import alt from '../alt';
import assign from 'object-assign';
import update from 'react/lib/update';
import WidgetAction from '../actions/WidgetAction'
import { FieldTypes } from '../constants';

function makeid() {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < 5; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

class WidgetStore {
  constructor() {
    this.bindActions(WidgetAction);
    this.state = {
      contentWidgets: [{
        id: 0,
        type: 'text',
        fields: [{
          type: FieldTypes.TEXTAREA,
          label: 'content',
        }],
        value: {
          content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt at natus ad delectus provident sit. Dolorum animi, facilis, eaque repellendus, illum libero voluptate sunt atque, beatae itaque a quia ipsam.',
        },
      }, {
        id: 1,
        type: 'img',
        fields: [{
          type: FieldTypes.TEXT,
          label: 'URL',
        }],
        value: {
          URL: '/blog/img/widget_img_sample.png',
        },
      }],

      sampleWidgets: [{
        id: 0,
        type: 'h1',
        fields: [{
          type: FieldTypes.TEXT,
          label: 'content',
        }],
        value: {
          content: 'Sample Header',
        },
      }, {
        id: 1,
        type: 'text',
        fields: [{
          type: FieldTypes.TEXTAREA,
          label: 'content',
        }],
        value: {
          content: 'sample text',
        },
      }, {
        id: 2,
        type: 'img',
        fields: [{
          type: FieldTypes.TEXT,
          label: 'URL',
        }],
        value: {
          URL: '/blog/img/widget_img_sample.png',
        },
      }],
    };
  }

  // onInsertWidget([index, widget]) {
  //   this.contentWidgets.splice(index, 0, {
  //     ...widget,
  //     id: makeid(),
  //   });
  // }

  onPushWidget(widget) {
    const newWidget = {
      ...widget,
      id: makeid(),
    };
    this.setState({
      contentWidgets: [
        ...this.state.contentWidgets,
        newWidget,
      ],
    });
  }

  onRemoveWidget(index) {
    let widgets = this.state.contentWidgets;
    this.setState({
      contentWidgets: [
        ...widgets.slice(0, index),
        ...widgets.slice(index + 1),
      ],
    });
  }

  onMoveWidget([dragIndex, hoverIndex]) {
    const widgets = this.state.contentWidgets;
    const dragWidget = widgets[dragIndex];

    this.setState(update(this.state, {
      contentWidgets: {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragWidget],
        ],
      },
    }));
  }

  onUpdateValue([index, newValue]) {
    let widgets = this.state.contentWidgets;
    let widget = widgets[index];
    const updatedWidget = {
      ...widget,
      value: assign({}, widget.value, newValue),
    };
    this.setState({
      contentWidgets: [
        ...widgets.slice(0, index),
        updatedWidget,
        ...widgets.slice(index + 1),
      ],
    });
  }
}

export default alt.createStore(WidgetStore, 'WidgetStore');