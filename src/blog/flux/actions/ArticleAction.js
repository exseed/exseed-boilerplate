import alt from '../alt';

class ArticleActions {
  constructor() {
    this.generateActions(
      'fetchAll',
      'fetch'
    );
  }
}

export default alt.createActions(ArticleActions);