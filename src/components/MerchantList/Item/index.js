import React from 'react';
import { PropTypes } from 'prop-types';

import './style.scss';

const MerchantItem = ({ merchant }) => (
  <div className="merchant-item">
    <div
      className="brand-logo"
      style={{ backgroundImage: `url(${merchant.logoUrl})` }}
    />
    <div className="info">
      <h4 className="name">
        {merchant.name}{' '}
        <span className="distance">{merchant.distance} mile</span>
      </h4>
      <p className="sub-title">{merchant.keywords}</p>
      <p className="price">
        ￥{merchant.price} <span className="sold">{merchant.sold} sold</span>
      </p>
    </div>
  </div>
);

MerchantItem.propTypes = {
  merchant: PropTypes.object.isRequired
};

export default MerchantItem;
