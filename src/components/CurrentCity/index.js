import React from 'react';
import { PropTypes } from 'prop-types';

import './style.scss';

const CurrentCity = ({ city }) => (
  <div className="current-city">
    <h2 className="title">{city}</h2>
  </div>
);

CurrentCity.propTypes = {
  city: PropTypes.string.isRequired
};

export default CurrentCity;
