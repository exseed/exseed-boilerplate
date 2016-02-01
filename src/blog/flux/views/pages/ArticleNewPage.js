import React from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import Card from '../components/Card';

@DragDropContext(HTML5Backend)
export default class ArticleNewPage extends React.Component {
  render() {
    return (
      <div>
        <Card id="1" />
        <Card id="2" />
      </div>
    );
  }
};