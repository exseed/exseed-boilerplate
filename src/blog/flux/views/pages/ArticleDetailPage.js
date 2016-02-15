import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import MenuLayout from '../layouts/MenuLayout';
import Widget from '../components/Widget';
import ArticleAction from '../../actions/ArticleAction';
import ArticleStore from '../../stores/ArticleStore';

@connectToStores
export default class ArticleDetailPage extends React.Component {
  static getStores() {
    return [ArticleStore];
  }

  static getPropsFromStores() {
    return ArticleStore.getState();
  }

  componentDidMount() {
    let { id } = this.props.params;
    ArticleAction.fetch(id);
  }

  render() {
    const {
      title,
      content,
    } = this.props.article;

    return (
      <MenuLayout>
        <div className="container right">
          <div className="ui basic segment">
            <h1 className="ui center aligned header">{title}</h1>
          </div>
          {content.map(widget =>
            <Widget
              key={widget.id}
              display={true}
              type={widget.type}
              value={widget.value} />)}
        </div>
      </MenuLayout>
    );
  }
};