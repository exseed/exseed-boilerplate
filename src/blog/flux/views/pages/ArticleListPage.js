import React from 'react';
import MenuLayout from '../layouts/MenuLayout';

export default class ArticleListPage extends React.Component {
  constructor(state) {
    super(state);
    this.state = {
      articleList: [],
    };
  }

  componentDidMount() {
    fetch('/api/blog/article')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log('data', data);
        this.setState({
          articleList: data,
        });
      });
  }

  render() {
    const list = this.state.articleList.map(article =>
      <div className="ui vertical padded segment" key={article.id}>
        <a className="ui header" href={`/blog/article/${article.id}`}>
          {article.title}
        </a>
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