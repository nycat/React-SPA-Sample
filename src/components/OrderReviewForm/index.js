import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Star from '../Star';
import * as api from '../../utils/api';

import './style.scss';

class OrderReviewForm extends Component {
  state = {
    star: 0,
    comment: ''
  };

  render() {
    const { order, onCancel } = this.props;
    const { star = 0, comment = '' } = this.state;
    return (
      <form className="add-review form" onSubmit={this.onSubmit}>
        <textarea
          name={'review' + order.id}
          id={'review' + order.id}
          className="textarea"
          value={comment}
          onChange={this.handleChange}
        />
        <Star star={star} onChangeStar={this.handleUpdateReviewStar} />
        <p className="btn-group">
          <button className="btn is-red" type="sbumit">
            submit
          </button>
          <button className="btn is-gray" onClick={onCancel} type="reset">
            cancel
          </button>
        </p>
      </form>
    );
  }

  handleUpdateReviewStar = starValue => {
    this.setState({
      star: starValue
    });
  };

  handleChange = e => {
    e.stopPropagation();

    this.setState({
      comment: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const { star, comment } = this.state;
    const orderId = this.props.order && this.props.order.id;
    if (!!star && !!comment) {
      api
        .reviewOrder(orderId, {
          star,
          comment
        })
        .then(order => {
          window.location.reload();
        });
    } else {
      window.alert('star and comment are needed!');
    }
  };
}

OrderReviewForm.propTypes = {
  order: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default OrderReviewForm;
