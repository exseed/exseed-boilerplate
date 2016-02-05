import alt from '../alt';
import assign from 'object-assign';
import update from 'react/lib/update';
import WidgetAction from '../actions/WidgetAction'
import { FieldTypes } from '../constants';

function _makeid() {
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
      // all allowed widgets
      widgetSets: [{
        id: 0,
        type: 'header',
        fields: [{
          type: FieldTypes.TEXT,
          label: 'content',
        }, {
          type: FieldTypes.SELECT,
          label: 'level',
          options: [
            { value: '1',   label: '1' },
            { value: '2',   label: '2' },
            { value: '3',   label: '3' },
            { value: '4',   label: '4' },
            { value: '5',   label: '5' },
          ],
        }],
        defaultValue: {
          content: 'Sample Header',
          align: 'left',
          level: 2,
        },
      }, {
        id: 1,
        type: 'text',
        fields: [{
          type: FieldTypes.TEXTAREA,
          label: 'content',
        }],
        defaultValue: {
          content: 'sample text',
        },
      }, {
        id: 2,
        type: 'img',
        fields: [{
          type: FieldTypes.TEXT,
          label: 'URL',
        }, {
          type: FieldTypes.SELECT,
          label: 'align',
          options: [
            { value: 'left',   label: 'Left' },
            { value: 'center', label: 'Center' },
          ],
        }, {
          type: FieldTypes.SELECT,
          label: 'size',
          options: [
            { value: 'mini',    label: 'Mini(35px)' },
            { value: 'tiny',    label: 'Tiny(80px)' },
            { value: 'small',   label: 'Small(150px)' },
            { value: 'medium',  label: 'Medium(300px)' },
            { value: 'large',   label: 'Large(450px)' },
            { value: 'big',     label: 'Big(600px)' },
            { value: 'huge',    label: 'Huge(800px)' },
            { value: 'massive', label: 'Massive(960px)' },
          ],
        }],
        defaultValue: {
          URL: '/blog/img/widget_img_sample.png',
          align: 'center',
          size: 'small',
        },
      }],

      // the widget sets that user constructs
      contentWidgets: [{
        id: 0,
        type: 'header',
        value: {
          content: 'Blog Title',
        },
      }, {
        id: 1,
        type: 'text',
        value: {
          content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt at natus ad delectus provident sit. Dolorum animi, facilis, eaque repellendus, illum libero voluptate sunt atque, beatae itaque a quia ipsam.',
        },
      }, {
        id: 2,
        type: 'img',
        value: {
          URL: '/blog/img/widget_img_sample.png',
          align: 'center',
          size: 'small',
        },
      }],
    };
  }

  // onInsertWidget([index, widget]) {
  //   this.contentWidgets.splice(index, 0, {
  //     ...widget,
  //     id: _makeid(),
  //   });
  // }

  onPushWidget(widget) {
    const newWidget = {
      id: _makeid(),
      type: widget.type,
      value: widget.defaultValue,
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