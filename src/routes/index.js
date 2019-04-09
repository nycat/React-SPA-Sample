import React, { Component } from 'react';
import { Router, Link } from '@reach/router';
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

export default class componentName extends Component {
  render() {
    return (
      <Router>
        <AsyncHome path="/" />
        <AsyncCity path="/city" />
        <AsyncUser path="/user" />
        <AsyncLogin path="/login" />
        <AsyncMerchant path="/merchant/:merchantId" />
        <AscyncSearch path="/search" />
      </Router>
    );
  }
}
