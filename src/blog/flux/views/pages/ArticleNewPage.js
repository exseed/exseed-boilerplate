import React from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import Widget from '../components/Widget';
import SampleWidget from '../components/SampleWidget';
import WidgetHolder from '../components/WidgetHolder';
import connectToStores from 'alt-utils/lib/connectToStores';
import WidgetStore from '../../stores/WidgetStore';

@DragDropContext(HTML5Backend)
@connectToStores
export default class ArticleNewPage extends React.Component {
  static getStores() {
    return [WidgetStore];
  }

  static getPropsFromStores() {
    return WidgetStore.getState();
  }

  render() {
    return (
      <div className="ui container basic segment">
        <div className="ui stackable grid">
          <div className="ui four wide column">
            <div className="ui secondary vertical pointing menu">
              {this.props.sampleWidgets.map(widget =>
                <SampleWidget
                  key={widget.id}
                  {...widget} />)}
            </div>
          </div>
          <div className="ui twelve wide column">
            {this.props.contentWidgets.map((widget, index) =>
              <span key={widget.id}>
                <WidgetHolder
                  index={index} />
                <Widget
                  {...widget} />
              </span>)}
            <WidgetHolder
              index={this.props.contentWidgets.length} />
          </div>
        </div>
      </div>
    );
  }
};