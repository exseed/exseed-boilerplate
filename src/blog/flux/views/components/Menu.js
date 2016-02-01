import React from 'react';
import { Link } from 'react-router';
// import { createLinkOf } from '@core/views/components/AppLink';

export default class Header extends React.Component {
  render() {
    // const EXSEED_APP_NAME = (
    //   this.props.route? this.props.route.EXSEED_APP_NAME: '');
    // const Link = createLinkOf(EXSEED_APP_NAME);

    return (
      <div className="ui secondary vertical pointing menu">
        <div className="item">
          <img
            className="ui mini image"
            src="/blog/img/logo.png" />
        </div>
        <Link
          app="blog"
          to="/blog"
          className="item">ARTICLE</Link>
        <Link
          app="blog"
          to="/blog/new"
          className="item">NEW ARTICLE</Link>
        <Link
          app="blog"
          to="/blog/about"
          className="item">ABOUT</Link>
        <Link
          app="blog"
          to="/blog/portfolio"
          className="item">PORTFOLIO</Link>
      </div>
    );
  }
};