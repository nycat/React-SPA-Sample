import React, { Component, Fragment } from 'react';
import { Router } from '@reach/router';
import { connect } from 'react-redux';
import Spinner from '../components/Spinner';
import asyncLoadComponent from '../utils/asyncLoadComponent';

const AsyncHome = asyncLoadComponent(() => {
  return import('../containers/Home/index');
});
const AsyncCity = asyncLoadComponent(() => {
  return import('../containers/City/index');
});
const AsyncUser = asyncLoadComponent(() => {
  return import('../containers/User/index');
});

const AsyncLogin = asyncLoadComponent(() => {
  return import('../containers/Login/index');
});

const AsyncMerchant = asyncLoadComponent(() => {
  return import('../containers/Merchant/index');
});

const AscyncSearch = asyncLoadComponent(() => {
  return import('../containers/Search/index');
});

class RouterMap extends Component {
  render() {
    const isAjaxLoading = this.props.isAjaxLoading;
    return (
      <Fragment>
        <Router>
          <AsyncHome path="/" />
          <AsyncCity path="/city" />
          <AsyncUser path="/user" />
          <AsyncLogin path="/login" />
          <AsyncMerchant path="/merchant/:merchantId" />
          <AscyncSearch path="/search" />
        </Router>
        {isAjaxLoading ? <Spinner /> : null}
      </Fragment>
    );
  }
}

const mapStateToProps = ({ app }, ownProps) => {
  return {
    isAjaxLoading: app.ajaxSpinner
  };
};

export default connect(
  mapStateToProps,
  null
)(RouterMap);
