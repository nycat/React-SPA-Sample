import React from 'react';
import { Link } from '@reach/router';
import { PropTypes } from 'prop-types';
import MerchantItem from './Item';

import './style.scss';

const MerchantList = ({ merchants }) => (
  <ul className="merchant-list">
    {merchants.map(merchant => (
      <li key={merchant.id}>
        <Link to={`/merchant/${merchant.id}`} className="to-merchant">
          <MerchantItem merchant={merchant} />
        </Link>
      </li>
    ))}
  </ul>
);

MerchantList.propTypes = {
  merchants: PropTypes.array.isRequired
};

export default MerchantList;
