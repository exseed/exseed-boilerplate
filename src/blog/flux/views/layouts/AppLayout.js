import React from 'react';
import BaseLayout from '@core/views/layouts/BaseLayout';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default class AppLayout extends React.Component {
  render() {
    // jscs:disable
    const scripts = [
      '/blog/js/bundle.js',
      'https://code.jquery.com/jquery-2.1.4.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.1.8/semantic.min.js',
    ];

    const styles = [
      'https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.1.8/semantic.min.css',
      '/blog/css/semantic-override.css',
    ];
    // jscs:enable

    return (
      <BaseLayout
        title="Blog"
        scripts={scripts}
        styles={styles} >
        <Header />
        {this.props.children}
        <Footer />
      </BaseLayout>
    );
  }
};