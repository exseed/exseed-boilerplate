import alt from '../alt';
import ArticleAction from '../actions/ArticleAction';

class ArticleStore {
  constructor() {
    this.bindActions(ArticleAction);
    this.state = {
      articles: [],
      article: {
        id: -1,
        title: undefined,
        content: [],
      },
    };
  }

  onFetchAll() {
    // use cached articles instead of redownloading it
    if (this.state.articles.length === 0) {
      fetch('/api/blog/article')
        .then((res) => {
          return res.json();
        })
        .then((articles) => {
          this.setState({
            articles: articles,
          });
        });
    }
  }

  onFetch(id) {
    // use cached article instead of redownloading it
    if (Number(this.state.article.id) !== Number(id) ||
        this.state.article.title === undefined) {
      fetch(`/api/blog/article/${id}`)
        .then((res) => {
          return res.json();
        })
        .then((article) => {
          this.setState({
            article: article,
          });
        });
    }
  }
}

export default alt.createStore(ArticleStore, 'ArticleStore');