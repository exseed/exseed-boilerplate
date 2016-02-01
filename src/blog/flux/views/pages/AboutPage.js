import React from 'react';
import MenuLayout from '../layouts/MenuLayout';

export default class AboutPage extends React.Component {
  render() {
    return (
      <MenuLayout>
        <div className="container">
          <h1>About</h1>
        </div>
      </MenuLayout>
    );
  }
};