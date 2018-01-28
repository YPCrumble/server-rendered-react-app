import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import cookie from 'react-cookie';
import PropTypes from 'prop-types';

class Navbar extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      show: false
    }
  }

  toggleMenu() {
    this.setState({
      show: !this.state.show
    });

    let home = document.getElementsByTagName('body')[0];
    if (home.className === 'is-opend') {
      home.className = '';
    } else {
      home.className = 'is-opend';
    }
  }

  logout() {
    cookie.remove('accessToken', {path: '/'});
    cookie.remove('userInfo', {path: '/'});

    if (typeof window != "undefined") {
      if (window.location.pathname === '/') {
        location.reload();
      } else {
        window.location = '/';
      }
    }
  }

  render() {
    const { isAuth, userInfo, clubs } = this.props;

    return (
      <div className="nav-wrapper">
        <div className="header-group-button">
          <button id="bt-open-menu" className={`btn btn-open-menu lines-button x ${this.state.show ? `is-opend` : ''}`} onClick={this.toggleMenu.bind(this)}>
            <span className="lines" />
          </button>
        </div>
        <div className={`nav-container ${this.state.show ? `is-opend` : ''}`}>
          <ul className="nav navbar-nav navbar-right">
            <li className="m-item"><a href="/about" className="m-link">About</a></li>
          </ul>
        </div>
      </div>
    );
  }
}

const bindStateToProps = state => {
  return {
    isAuth: state.auth ? state.auth.isAuth : false,
    userInfo: state.auth.userInfo,
  };
};

const bindDispatchToProps = dispatch => ({
  dispatch
});

export default connect(bindStateToProps, bindDispatchToProps)(Navbar);
