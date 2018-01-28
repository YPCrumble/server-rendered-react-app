import React from 'react';
import PropTypes from 'prop-types';
import ImageItem from '../partials/ImageItem.jsx';

class Home extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const imageUrl = "giphy-tumblr.gif";
    const imageAlt = "Image alt";
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-6 col-xs-offset-3 home-banner">
            <h1 className="text-center">This is the home page!</h1>
            <ImageItem image={imageUrl} className="image" description={imageAlt} type="local" />
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  isAuth: PropTypes.bool
};

export default Home;
