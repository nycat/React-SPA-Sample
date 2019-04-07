import React, { Component } from 'react';
import FormInputField from '../../Form/FormInputField';
import { navigate } from '@reach/router';
import * as api from '../../../utils/api';

import './style.scss';

export default class PlaceOrderForm extends Component {
  state = {
    amount: ''
  };

  render() {
    return (
      <div className="place-order">
        <h3 className="title">Place Order</h3>
        <form onSubmit={this.placeOrder} className="place-order-form">
          <FormInputField
            label={'amount'}
            name={'amount'}
            value={this.state.amount}
            placeholder="amoutn to buy"
            onChange={this.handleChange}
          />
          <div className="form-field btn-group">
            <button type="submit" className="btn is-red">
              Submit
            </button>
            <span className="btn is-gray" onClick={this.props.onCloseOrderForm}>
              Cancel
            </span>
          </div>
        </form>
      </div>
    );
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  placeOrder = e => {
    e.preventDefault();
    if (!/^[1-9]{1}[0-9]*$/.test(Number(this.state.amount))) {
      return window.alert('Please input amount! ');
    }
    api
      .placeOrder({
        merchantId: this.props.merchantId,
        amount: this.state.amount
      })
      .then(order => {
        navigate('/user');
      })
      .catch(e => {
        console.log(e);
      });
  };

  hideForm = () => {
    this.setState({
      showForm: false
    });
  };
}
