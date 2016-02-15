import alt from '../alt';

class WidgetActions {
  constructor() {
    this.generateActions(
      'insertWidget',
      'pushWidget',
      'removeWidget',
      'moveWidget',
      'updateValue',
      'updateInsertableHoverDirection',
      'publishSucc',
      'publishFail'
    );
  }

  publish(title, content) {
    return $.ajax({
      url: '/api/blog/article',
      dataType: 'json',
      contentType: 'application/json',
      type: 'POST',
      data: JSON.stringify({
        title: title,
        content: content,
      }),
      success: (res) => {
        this.publishSucc(res);
      },
      error: (xhr, status, err) => {
        this.publishFail(xhr);
        console.error(status, err.toString());
      },
    });
  }
}

export default alt.createActions(WidgetActions);