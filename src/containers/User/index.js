import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/Layout/header';
import UserInfo from '../../components/UserInfo';

class User extends Component {
  render() {
    const { userNickname, userLocation } = this.props;
    return (
      <div>
        <Header title="User Center" />
        <UserInfo nickname={userNickname} location={userLocation} />
      </div>
    );
  }
}

function mapStateToProps({ user }) {
  return {
    userLocation: user && user.location,
    userNickname: user && user.nickname
  };
}
export default connect(
  mapStateToProps,
  null
)(User);
