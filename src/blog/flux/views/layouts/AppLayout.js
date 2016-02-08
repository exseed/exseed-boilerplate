import React from 'react';
import BaseLayout from '@core/views/layouts/BaseLayout';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default class AppLayout extends React.Component {
  render() {
    // here is the cdn for prism: http://www.jsdelivr.com/projects/prism
    // jscs:disable
    const scripts = [
      'https://code.jquery.com/jquery-2.1.4.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.1.8/semantic.min.js',
      'https://cdn.jsdelivr.net/g/prism@1.4.1(prism.js+components/prism-clike.min.js+components/prism-markdown.min.js+components/prism-markup.min.js+components/prism-css.min.js+components/prism-less.min.js+components/prism-jsx.min.js+components/prism-javascript.min.js+components/prism-json.min.js+components/prism-sql.min.js+plugins/line-numbers/prism-line-numbers.min.js+plugins/line-highlight/prism-line-highlight.min.js)',
      '/blog/js/bundle.js',
      '/blog/js/main.js',
    ];

    const styles = [
      'https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.1.8/semantic.min.css',
      'https://cdn.jsdelivr.net/g/prism@1.4.1(themes/prism-okaidia.css+plugins/line-numbers/prism-line-numbers.css+plugins/line-highlight/prism-line-highlight.css)',
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