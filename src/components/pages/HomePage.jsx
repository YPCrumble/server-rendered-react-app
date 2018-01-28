import React from 'react';
import { MasterLayout } from 'layout';
import { connect } from 'react-redux';
import Home from 'modules/home';
import Promise from 'bluebird';
import PropTypes from 'prop-types';

class HomePage extends React.Component {
  render() {
    return (
      <div className="bg-homepage-fix">
        <MasterLayout classHeader="bg-transparent">
          <Home isAuth={this.props.isAuth} />
        </MasterLayout>
      </div>
    );
  }
}

HomePage.fetchData = function(options) {
  const {store} = options;

  return Promise.all([
  ]).spread(() => {
    let data = {
      seo: {
        title: 'This is the page title.',
        description: 'This is the page description.',
      }
    };
    return Promise.resolve(data);
  });
}

HomePage.propTypes = {
  isAuth: PropTypes.bool
};

const bindStateToProps = state => {
  return {
    isAuth: state.auth ? state.auth.isAuth : false
  }
}

export default connect(bindStateToProps)(HomePage);
