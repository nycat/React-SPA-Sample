import React, { Fragment } from 'react';
import { PropTypes } from 'prop-types';
import Star from '../../components/Star';

import './style.scss';

const MerchantInfo = ({ merchant }) => (
  <Fragment>
    <div className="merchant-info">
      <div className="inner">
        <div
          className="brand-logo"
          style={{ backgroundImage: `url(${merchant.logoUrl})` }}
        />
        <div className="desc">
          <h4 className="merchant-name">{merchant.name}</h4>
          <div className="star-level">
            <Star star={merchant.star} />
            <span className="price">￥{merchant.price}</span>
          </div>
          <p className="sub-title">{merchant.keywords}</p>
        </div>
      </div>
    </div>
    <div className="opening-info">
      <div className="inner">
        <p>opening hours: {merchant.openingHours}</p>
        <p>contact: {merchant.tel}</p>
      </div>
    </div>
  </Fragment>
);

MerchantInfo.propTypes = {
  merchant: PropTypes.object.isRequired
};

export default MerchantInfo;
