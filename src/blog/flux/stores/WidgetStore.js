import alt from '../alt';
import assign from 'object-assign';
import update from 'react/lib/update';
import WidgetAction from '../actions/WidgetAction';
import { FieldTypes } from '../constants';

function _makeid() {
  let text = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

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
          label: 'header',
        }, {
          type: FieldTypes.TEXT,
          label: 'subheader',
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
        },],
        defaultValue: {
          header: 'SAMPLE HEADER',
          subheader: 'And Subheader',
          align: 'left',
          level: 2,
        },
      }, {
        id: 1,
        type: 'text',
        fields: [{
          type: FieldTypes.TEXTAREA,
          label: 'content',
        },],
        defaultValue: {
          content: 'sample text',
        },
      }, {
        id: 2,
        type: 'img',
        fields: [{
          type: FieldTypes.TOGGLE,
          label: 'center',
        }, {
          type: FieldTypes.TOGGLE,
          label: 'border',
        }, {
          type: FieldTypes.TOGGLE,
          label: 'round',
        }, {
          type: FieldTypes.TOGGLE,
          label: 'circular',
        }, {
          type: FieldTypes.TEXT,
          label: 'URL',
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
        },],
        defaultValue: {
          center: true,
          border: false,
          round: false,
          circular: false,
          URL: '/blog/img/widget_img_sample.png',
          align: 'center',
          size: 'small',
        },
      }, {
        id: 3,
        type: 'code',
        fields: [{
          type: FieldTypes.SELECT,
          label: 'language',
          options: [
            { value: 'markup',     label: 'markup' },
            { value: 'css',        label: 'css' },
            { value: 'javascript', label: 'js' },
            { value: 'jsx',        label: 'jsx' },
            { value: 'markdown',   label: 'markdown' },
          ],
        }, {
          type: FieldTypes.TEXTAREA,
          label: 'code',
        }, {
          type: FieldTypes.TEXT,
          label: 'lineHighlight',
        }, {
          type: FieldTypes.TOGGLE,
          label: 'showLineHighlight',
        }, {
          type: FieldTypes.TOGGLE,
          label: 'showLineNumbers',
        }, {
          type: FieldTypes.SELECT,
          label: 'maxHeight',
          options: [
            { value: 'auto', label: 'Auto' },
            { value: 300,    label: '300px' },
            { value: 600,    label: '600px' },
          ],
        },],
        defaultValue: {
          language: 'javascript',
          showLineHighlight: true,
          showLineNumbers: false,
          lineHighlight: '',
          maxHeight: 300,
          code: `//
//   █████▒█    ██  ▄████▄   ██ ▄█▀       ██████╗ ██╗   ██╗ ██████╗
// ▓██   ▒ ██  ▓██▒▒██▀ ▀█   ██▄█▒        ██╔══██╗██║   ██║██╔════╝
// ▒████ ░▓██  ▒██░▒▓█    ▄ ▓███▄░        ██████╔╝██║   ██║██║  ███╗
// ░▓█▒  ░▓▓█  ░██░▒▓▓▄ ▄██▒▓██ █▄        ██╔══██╗██║   ██║██║   ██║
// ░▒█░   ▒▒█████▓ ▒ ▓███▀ ░▒██▒ █▄       ██████╔╝╚██████╔╝╚██████╔╝
//  ▒ ░   ░▒▓▒ ▒ ▒ ░ ░▒ ▒  ░▒ ▒▒ ▓▒       ╚═════╝  ╚═════╝  ╚═════╝
//  ░     ░░▒░ ░ ░   ░  ▒   ░ ░▒ ▒░
//  ░ ░    ░░░ ░ ░ ░        ░ ░░ ░
//           ░     ░ ░      ░  ░
//                 ░`,
        },
      },],

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
          // jscs:disable
          content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt at natus ad delectus provident sit. Dolorum animi, facilis, eaque repellendus, illum libero voluptate sunt atque, beatae itaque a quia ipsam.',
          // jscs:enable
        },
      }, {
        id: 2,
        type: 'img',
        value: {
          URL: '/blog/img/widget_img_sample.png',
          align: 'center',
          size: 'small',
        },
      },],
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