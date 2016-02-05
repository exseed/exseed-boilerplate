import React from 'react';
import { FieldTypes } from '../../constants';
import Text from './widgets/Text';
import Image from './widgets/Image';
import Header1 from './widgets/Header1';

export default class Widget extends React.Component {
  constructor(state) {
    super(state);
    this.mouseOver = this.mouseOver.bind(this);
    this.mouseOut = this.mouseOut.bind(this);
    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleEditorSubmit = this._handleEditorSubmit.bind(this);
    // this._handleFieldChange = this._handleFieldChange.bind(this);
    this.renderWidgetToolbar = this.renderWidgetToolbar.bind(this);
    this.renderWidgetEditor = this.renderWidgetEditor.bind(this);
    this.state = {
      isShowToolbar: false,
      isShowEditor: false,
      value: this.props.value,
    };
  }

  mouseOver() {
    this.setState({
      isShowToolbar: true
    });
  }

  mouseOut() {
    this.setState({
      isShowToolbar: false
    });
  }

  _handleEditClick(e) {
    this.setState({
      isShowEditor: !this.state.isShowEditor,
    });
  }

  _handleFieldChange(label, e) {
    let newPair = {};
    newPair[`${label}`] = e.target.value;
    this.setState({
      value: newPair,
    });
  }

  _handleEditorSubmit(e) {
    this.props.onSave(this.state.value);
  }

  renderWidgetToolbar() {
    const style = {
      backgroundColor: '#eee',
      zIndex: 999,
      position: 'absolute',
      top: 0,
      right: 0,
      padding: 2,
      display: this.state.isShowToolbar || this.state.isShowEditor? 'block': 'none',
    };

    return (
      <div style={style}>
        <span className="ui teal label">
          {this.props.type}
        </span>
        <span
          className="ui teal label"
          onClick={this._handleEditClick}>
          <i className="edit icon"></i>
          Edit
        </span>
      </div>
    );
  }

  renderWidgetEditor() {
    const style = {
      backgroundColor: '#eee',
      width: '100%',
      padding: 2,
      display: this.state.isShowEditor? 'block': 'none',
    };

    const { fields } = this.props;

    return (
      <div style={style}>
        <div className="ui form">
          {fields.map(field =>
            <div className="field" key={field.label}>
              <label>{field.label}</label>
              {field.type == FieldTypes.TEXTAREA &&
                <textarea
                  onChange={this._handleFieldChange.bind(this, field.label)}
                  value={this.state.value[field.label]} />}
              {field.type == FieldTypes.TEXT &&
                <input
                  type="text"
                  onChange={this._handleFieldChange.bind(this, field.label)}
                  value={this.state.value[field.label]} />}
            </div>)}
          <div
            className="ui submit mini teal button"
            onClick={this._handleEditorSubmit}>
            Save
          </div>
        </div>
      </div>
    );
  }

  render() {
    const widgetMap = {
      text: Text,
      img: Image,
      h1: Header1,
    };

    const {
      onChange,
      type,
      value
    } = this.props;

    const WidgetComponent = widgetMap[type];

    const style = {
      position: 'relative',
      outline: this.state.isShowToolbar || this.state.isShowEditor? '1px dashed #aaa': 'none',
    };

    return (
      <div
        onMouseOver={this.mouseOver}
        onMouseOut={this.mouseOut}
        style={style}>
        {this.renderWidgetToolbar()}
        <WidgetComponent
          preview={true}
          value={value}
          onChange={onChange} />
        {this.renderWidgetEditor()}
      </div>
    );
  }
};