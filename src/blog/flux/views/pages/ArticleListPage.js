import React from 'react';
import { Link } from 'react-router';
import connectToStores from 'alt-utils/lib/connectToStores';
import MenuLayout from '../layouts/MenuLayout';
import ArticleAction from '../../actions/ArticleAction';
import ArticleStore from '../../stores/ArticleStore';

@connectToStores
export default class ArticleListPage extends React.Component {
  static getStores() {
    return [ArticleStore];
  }

  static getPropsFromStores() {
    return ArticleStore.getState();
  }

  componentDidMount() {
    ArticleAction.fetchAll();
  }

  render() {
    const list = this.props.articles.map(article =>
      <div className="ui vertical padded segment" key={article.id}>
        <Link className="ui header" to={`/blog/article/${article.id}`}>
          {article.title}
        </Link>
      </div>
    );

    return (
      <MenuLayout>
        <div className="container right">
          <div className="ui very relaxed items">
            {list}
          </div>
        </div>
      </MenuLayout>
    );
  }
};