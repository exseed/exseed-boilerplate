import alt from '../alt';
import WidgetAction from '../actions/WidgetAction'

class WidgetStore {
  constructor() {
    this.bindActions(WidgetAction);

    this.contentWidgets = [];
    this.sampleWidgets = [{
      id: 1,
      type: 'text',
      value: 'sample text',
    }, {
      id: 2,
      type: 'img',
      value: {
        src: '/blog/img/widget_img_sample.png',
      },
    }];
  }

  onInsertWidget([index, widget]) {
    this.contentWidgets.splice(index, 0, widget);
  }
}

export default alt.createStore(WidgetStore, 'WidgetStore');