import React from 'react';
import { MasterLayout } from 'layout';
import About from 'modules/about';
import Promise from 'bluebird';

class AboutPage extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <MasterLayout>
        <About />
      </MasterLayout>
    );
  }
}

AboutPage.fetchData = function(options) {
  let data = {
    seo: {
      title: 'This is the About page title.',
      description: 'This is the About page description.',
    }
  };
  return Promise.resolve(data);
}

export default AboutPage;
