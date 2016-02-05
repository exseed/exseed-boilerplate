import React from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import SampleWidget from '../components/SampleWidget';
import SortableWidget from '../components/SortableWidget';
import connectToStores from 'alt-utils/lib/connectToStores';
import WidgetAction from '../../actions/WidgetAction';
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

  _handleInsertClick(widget) {
    WidgetAction.pushWidget(widget);
  }

  renderInsertDropdown() {
    return (
      <div className="ui compact menu">
        <div className="ui simple dropdown item">
          Insert
          <i className="dropdown icon"></i>
          <div className="menu">
            {this.props.widgetSets.map((widget, index) =>
              <div
                key={index}
                className="item"
                onClick={this._handleInsertClick.bind(this, widget)}>
                {widget.type}
              </div>)}
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="ui container basic segment">
        <div className="ui stackable grid">
          <div className="ui four wide column">
            {this.renderInsertDropdown()}
            <div className="ui secondary vertical pointing menu">
              {this.props.widgetSets.map(widget =>
                <SampleWidget
                  key={widget.id}
                  {...widget} />)}
            </div>
          </div>
          <div className="ui twelve wide column">
            {this.props.contentWidgets.map((widget, index) =>
              <SortableWidget
                key={widget.id}
                index={index}
                {...widget} />)}
          </div>
        </div>
      </div>
    );
  }
};