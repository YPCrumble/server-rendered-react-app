import React from 'react';

class About extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {

    return (
      <div className="row">
        <div className="col-xs-12 about-text">
          <h4 className="block-title">About Us</h4>
          <p className="text-bold">This is the about us page!</p>
        </div>
      </div>
    );
  }
}

export default About;
