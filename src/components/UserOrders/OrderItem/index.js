import React, { Component, Fragment } from 'react';
import { Link } from '@reach/router';
import { PropTypes } from 'prop-types';
import OrderReviewForm from '../../OrderReviewForm';

import './style.scss';

class Order extends Component {
  state = {
    openReview: false
  };

  toggleReviewForm = e => {
    this.setState({
      openReview: true
    });
    e.stopPropagation();
  };

  handleCancelReview = e => {
    this.setState({
      openReview: false
    });
    e.stopPropagation();
  };

  render() {
    const { order } = this.props;
    const { openReview } = this.state;

    return (
      <Fragment>
        <div className="order-item">
          <div className="order-info">
            <div
              className="brand-logo"
              style={{ backgroundImage: `url(${order.logoUrl})` }}
            />
            <div className="detail">
              <Link
                to={`/merchant/${order.merchantId}`}
                className="product-name"
              >
                {order.merchant}
              </Link>
              <span className="order-price">
                Price: <strong>${order.price}</strong>
              </span>
              <span className="order-amount">
                Amount: <strong>{order.amount}</strong>
              </span>
              <span className="total-price">
                Total: <strong>${order.total}</strong>
              </span>
            </div>
          </div>
          {order.reviewed ? (
            <button className="btn" disabled={order.reviewed}>
              reviewed
            </button>
          ) : openReview ? null : (
            <button className="btn btn-review" onClick={this.toggleReviewForm}>
              review
            </button>
          )}
        </div>
        {!order.reviewed && openReview ? (
          <OrderReviewForm order={order} onCancel={this.handleCancelReview} />
        ) : null}
      </Fragment>
    );
  }
}

Order.propTypes = {
  order: PropTypes.object.isRequired
};

export default Order;
