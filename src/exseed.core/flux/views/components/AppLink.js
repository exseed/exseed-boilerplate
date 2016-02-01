import React from 'react';
import { Link } from 'react-router';

export function createLinkOf(appName) {
  return class AppLink extends React.Component {
    render() {
      if (this.props.app === appName) {
        return (
          <Link
            {...this.props}
            to={this.props.to}>
            {this.props.children}
          </Link>
        );
      }
      return (
        <a {...this.props} href={this.props.to}>
          {this.props.children}
        </a>
      );
    }
  };
};