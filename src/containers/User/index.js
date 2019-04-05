import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/Layout/header';
import UserInfo from '../../components/UserInfo';
import UserOrders from '../../components/UserOrders';
import { navigate } from '@reach/router';

class User extends Component {
  state = {};

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!nextProps.nickname) {
      navigate('/login');
    } else {
      return null;
    }
  }

  render() {
    const { nickname, location } = this.props;
    if (!nickname) {
      return null;
    }

    return (
      <div>
        <Header title="User Center" />
        <UserInfo nickname={nickname} location={location} />
        <UserOrders />
      </div>
    );
  }
}

function mapStateToProps({ user }) {
  return {
    location: user && user.location,
    nickname: user && user.nickname
  };
}
export default connect(
  mapStateToProps,
  null
)(User);
