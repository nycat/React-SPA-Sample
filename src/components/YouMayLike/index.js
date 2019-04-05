import React from 'react';
import { connect } from 'react-redux';
import MerchantList from '../MerchantList';

import './style.scss';

const YouMayLike = ({ user }) => (
  <div className="you-may-like">
    <h3 className="title">You May Like</h3>
    <MerchantList city={user.location} />
  </div>
);

const mapStateToProps = ({ user }, ownProps) => {
  return {
    user
  };
};

export default connect(
  mapStateToProps,
  null
)(YouMayLike);
