import alt from '../alt';

class ArticleAction {
  constructor() {
    this.generateActions(
      'fetchAll',
      'fetch'
    );
  }
}

export default alt.createActions(ArticleAction);