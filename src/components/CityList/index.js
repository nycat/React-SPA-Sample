import React from 'react';
import { PropTypes } from 'prop-types';

import './style.scss';

const CityList = ({ onClickCity, hotCities }) => (
  <div className="city-list">
    <h3 className="title">Hot Cities</h3>
    <ul>
      {hotCities &&
        hotCities.map(city => (
          <li key={city} onClick={onClickCity} className="city-item">
            {city}
          </li>
        ))}
    </ul>
  </div>
);

CityList.propTypes = {
  onClickCity: PropTypes.func.isRequired,
  hotCities: PropTypes.array
};

export default CityList;
