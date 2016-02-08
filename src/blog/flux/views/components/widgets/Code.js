import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

export default class Code extends React.Component {
  constructor(props) {
    super(props);
    this._highlight = ::this._highlight;
  }

  componentDidMount() {
    this._highlight();
  }

  componentDidUpdate() {
    this._highlight();
  }

  _highlight() {
    const { codeblock } = this.refs;
    const elementPre = ReactDOM.findDOMNode(codeblock);
    /* Patch Begin */
    // This is a patch for prism `line highlight` plugin
    // since prism breaks when we re-highlight the code.
    // Please refer to the source of
    // [Line highlight](http://prismjs.com/plugins/line-highlight/),
    // and see line 7-9, 119-121.
    const elementLines = [...elementPre.querySelectorAll('.line-highlight')];
    elementLines.forEach((elementLine) => {
      elementLine.parentNode.removeChild(elementLine);
    });
    /* Patch End */
    Prism.highlightElement(elementPre);
  }

  render() {
    const { value } = this.props;
    const preClass = classNames({'line-numbers': value.showLineNumbers});
    const codeClass = classNames(
      'blog-widget-code', `language-${value.language}`);
    const style = {
      pre: {
        maxHeight: value.maxHeight === 'auto'? 'none': value.maxHeight,
        position: 'relative',
      },
    };

    return (
      <pre
        className={preClass}
        style={style.pre}
        data-line={value.lineHighlight}>
        <code
          className={codeClass}
          ref="codeblock">
          {value.code}
        </code>
      </pre>
    );
  }
};