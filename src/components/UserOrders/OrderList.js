import React from 'react';
import OrderItem from './OrderItem/index';
import { PropTypes } from 'prop-types';

const OrderList = ({ orders }) => {
  return (
    <ul>
      {orders.map((order, index) => (
        <li key={order.id}>
          <OrderItem order={order} />
        </li>
      ))}
    </ul>
  );
};

OrderList.propTypes = {
  orders: PropTypes.array.isRequired
};

export default OrderList;
