import React from 'react';

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
        this.setState({
          articleList: data,
        });
      });
  }

  render() {
    const list = this.state.articleList.map(article =>
      <div className="ui vertical padded segment" key={article.id}>
        <a className="ui header" href="#">
          {article.title}
        </a>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo
        </p>
      </div>
    );

    return <div className="container right">
      <div class="ui very relaxed items">
        {list}
      </div>
    </div>;
  }
};