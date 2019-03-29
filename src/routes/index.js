import React, { Component } from 'react';
import { Router, Link } from '@reach/router';
import asyncLoadComponent from '../utils/asyncLoadComponent';

const AsyncHome = asyncLoadComponent(() => {
  return import('../containers/Home');
});
const AsyncCity = asyncLoadComponent(() => {
  return import('../containers/City');
});
const AsyncUser = asyncLoadComponent(() => {
  return import('../containers/User');
});

export default class componentName extends Component {
  render() {
    return (
      <div className="router-map">
        <ul>
          <li>
            <Link to="/">home</Link>
          </li>
          <li>
            <Link to="/city">city</Link>
          </li>
          <li>
            <Link to="/user">user</Link>
          </li>
        </ul>
        <Router>
          <AsyncHome path="/" />
          <AsyncCity path="/city" />
          <AsyncUser path="/user" />
        </Router>
      </div>
    );
  }
}
