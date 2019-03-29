import React from 'react';
import { PropTypes } from 'prop-types';

import './style.scss';

const UserInfo = ({ nickname, location }) => (
  <div className="user-info">
    <p className="nickname">
      <i className="icon-user" />
      &nbsp;
      <span>{nickname}</span>
    </p>
    <p className="user-location">
      <i className="icon-map-marker" />
      &nbsp;
      <span>{location}</span>
    </p>
  </div>
);

UserInfo.propTypes = {
  nickname: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired
};

export default UserInfo;
