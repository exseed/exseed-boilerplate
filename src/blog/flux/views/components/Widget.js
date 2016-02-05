import React from 'react';
import classNames from 'classnames';
import assign from 'object-assign';
import WidgetStore from '../../stores/WidgetStore';
import { FieldTypes } from '../../constants';

// widget sets
import Text from './widgets/Text';
import Image from './widgets/Image';
import Header from './widgets/Header';

function _getWidgetSet(type) {
  const { widgetSets } = WidgetStore.getState();
  const widgetSet = widgetSets.filter(widget =>
    widget.type === type)[0];
  return widgetSet;
}

export default class Widget extends React.Component {
  constructor(state) {
    super(state);
    this._handleMouseOver = this._handleMouseOver.bind(this);
    this._handleMouseOut = this._handleMouseOut.bind(this);
    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleEditorSubmit = this._handleEditorSubmit.bind(this);
    this._handleWidgetRemove = this._handleWidgetRemove.bind(this);
    this._renderWidgetToolbar = this._renderWidgetToolbar.bind(this);
    this._renderWidgetEditor = this._renderWidgetEditor.bind(this);

    // use default value when some value is not defined
    const composedValue = assign(
      {},
      _getWidgetSet(this.props.type).defaultValue,
      this.props.value
    );
    this.state = {
      isShowToolbar: false,
      isShowEditor: false,
      value: composedValue,
    };
  }

  _handleMouseOver() {
    this.setState({ isShowToolbar: true });
  }

  _handleMouseOut() {
    this.setState({ isShowToolbar: false });
  }

  _handleEditClick(e) {
    this.setState({
      isShowEditor: !this.state.isShowEditor,
    });
  }

  _handleFieldChange(field, e) {
    const { label, type } = field;
    let newPair = {};
    if (type === FieldTypes.TOGGLE) {
      newPair[`${label}`] = !this.state.value[label];
    } else {
      newPair[`${label}`] = e.target.value;
    }
    const newValue = assign({}, this.state.value, newPair);
    this.setState({
      value: newValue,
    });
  }

  _handleEditorSubmit(e) {
    this.props.onSave(this.state.value);
  }

  _handleWidgetRemove(e) {
    this.props.onRemove();
  }

  _renderWidgetToolbar() {
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
        <a
          className="ui teal label"
          onClick={this._handleEditClick}>
          <i className="edit icon"></i>
          Edit
        </a>
      </div>
    );
  }

  _renderWidgetEditor() {
    const { fields } = _getWidgetSet(this.props.type);
    const inlineFields = fields
      .filter(field => field.type === FieldTypes.TOGGLE);
    const blockFields = fields
      .filter(field => field.type !== FieldTypes.TOGGLE);

    const style = {
      backgroundColor: '#eee',
      width: '100%',
      padding: 2,
      display: this.state.isShowEditor? 'block': 'none',
    };

    return (
      <div style={style}>
        <div className="ui form">
          {inlineFields.length > 0 &&
            <div className="inline fields">
              {inlineFields.map(field => {
                return (
                  <div className="field" key={field.label}>
                    <div className="ui checkbox">
                      <input
                        type="checkbox"
                        onChange={this._handleFieldChange.bind(this, field)}
                        checked={this.state.value[field.label]} />
                      <label>{field.label}</label>
                    </div>
                  </div>
                );
              })}
            </div>}
          {blockFields.map(field => {
            if (field.type === FieldTypes.TEXT) {
              return (
                <div className="field" key={field.label}>
                  <label>{field.label}</label>
                  <input
                    type="text"
                    onChange={this._handleFieldChange.bind(this, field)}
                    value={this.state.value[field.label]} />
                </div>
              );
            } else if (field.type === FieldTypes.TEXTAREA) {
              return (
                <div className="field" key={field.label}>
                  <label>{field.label}</label>
                  <textarea
                    onChange={this._handleFieldChange.bind(this, field)}
                    value={this.state.value[field.label]} />
                </div>
              );
            } else if (field.type === FieldTypes.SELECT) {
              return (
                <div className="field" key={field.label}>
                  <label>{field.label}</label>
                  <select
                    defaultValue={this.state.value[field.label]}
                    onChange={this._handleFieldChange.bind(this, field)}>
                    {field.options.map(option =>
                      <option
                        key={option.value}
                        value={option.value}>
                        {option.label}
                      </option>)}
                  </select>
                </div>
              );
            } else {
              return (
                <div>
                  Unknow field type: {field.type}
                </div>
              );
            }
          })}
          <div
            className="ui mini red button"
            onClick={this._handleWidgetRemove}>
            Delete
          </div>
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
    const widgetComponentMap = {
      text: Text,
      img: Image,
      header: Header,
    };

    const {
      type,
      value
    } = this.props;

    const WidgetComponent = widgetComponentMap[type];

    const style = {
      position: 'relative',
      outline: this.state.isShowToolbar || this.state.isShowEditor? '1px dashed #aaa': 'none',
    };

    const widgetWrapperClass = classNames(
      'ui',
      'basic',
      'segment', {
        'disabled': this.state.isShowEditor,
      }
    );

    // this value is for previewing widget,
    // so we don't use `this.props.value`
    // instead of `this.state.value` as custom value
    const composedValue = assign(
      {},
      _getWidgetSet(this.props.type).defaultValue,
      value
    );

    return (
      <div
        onMouseOver={this._handleMouseOver}
        onMouseOut={this._handleMouseOut}
        style={style}>
        {this._renderWidgetToolbar()}
        <div
          className={widgetWrapperClass}
          onDoubleClick={this._handleEditClick}>
          <WidgetComponent
            value={composedValue} />
        </div>
        {this._renderWidgetEditor()}
      </div>
    );
  }
};