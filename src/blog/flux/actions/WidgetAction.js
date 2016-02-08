import alt from '../alt';

class WidgetActions {
  constructor() {
    this.generateActions(
      'insertWidget',
      'pushWidget',
      'removeWidget',
      'moveWidget',
      'updateValue',
      'updateInsertableHoverDirection'
    );
  }
}

export default alt.createActions(WidgetActions);