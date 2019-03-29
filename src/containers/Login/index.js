import React, { Component } from 'react';
import { connect } from 'react-redux';
import { navigate } from '@reach/router';
import Header from '../../components/Layout/header';

import './style.scss';

class Login extends Component {
  state = {
    account: '',
    password: ''
  };

  static getDerivedStateFromProps(props, state) {
    if (props.isLogin) {
      const history = window.history;
      if (history.length) {
        history.go(-1);
      } else {
        navigate('/user');
      }
    }
    return null;
  }

  render() {
    return (
      <div className="login-page">
        <Header title="Login" />
        <form onSubmit={this.doLogin} className="login-form">
          <div className="form-field">
            <i className="icon-tablet icon" />
            <input
              type="text"
              placeholder="Account"
              name={'account'}
              onChange={this.handleChange}
              value={this.state.account}
            />
          </div>
          <div className="form-field">
            <i className="icon-tablet icon" />
            <input
              type="password"
              placeholder="Password"
              name={'password'}
              onChange={this.handleChange}
              value={this.state.passwod}
            />
          </div>
          <div className="form-field">
            <button type="submit">submit</button>
          </div>
        </form>
      </div>
    );
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    e.stopPropagation();
  };

  doLogin = e => {
    e.preventDefault();
    const { account, password } = this.state;
    const validAccount = /\d{11}/.test(account);
    const validPassword = password.length >= 6;

    if (validPassword && validAccount) {
      this.props.doLoginAndCacheUser({
        account,
        password
      });
    } else {
      window.alert('password doese not match phone number!');
    }
  };
}

const mapStateToProps = ({ user }, ownProps) => {
  return {
    isLogin: !!user.token
  };
};

const mapDispatchToProps = ({ user }, ownProps) => {
  const { doLoginAndCacheUser } = user;
  return {
    doLoginAndCacheUser
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
