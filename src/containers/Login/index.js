import React, { Component } from 'react';
import { connect } from 'react-redux';
import { navigate } from '@reach/router';
import Header from '../../components/Layout/header';
import FormInputField from '../../components/Form/FormInputField';

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
    if (this.props.isLogin) return null;

    return (
      <div className="login-page">
        <Header title="Login" />
        <form onSubmit={this.doLogin} className="login-form">
          <FormInputField
            name="account"
            value={this.state.account}
            onChange={this.handleChange}
            icon="icon-user"
          />
          <FormInputField
            name="password"
            value={this.state.password}
            type="password"
            onChange={this.handleChange}
            icon="icon-tablet"
          />
          <div className="form-field">
            <button type="submit">submit</button>
          </div>
        </form>
      </div>
    );
  }

  handleChange = e => {
    e.stopPropagation();
    this.setState({
      [e.target.name]: e.target.value
    });
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
