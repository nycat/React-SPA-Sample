import React, { Component, Fragment } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { navigate } from '@reach/router';
import PlaceOrderForm from './PlaceOrderForm';
import * as api from '../../utils/api';

import './style.scss';

class BuyOrCollect extends Component {
  state = {
    showOrderForm: false
  };

  render() {
    const merchantId = this.props.merchantId;
    const isLogin = !!this.props.token;
    const showOrderForm = this.state.showOrderForm;
    return (
      <Fragment>
        <div className="buy-or-favorite">
          <span className="btn order" onClick={this.showOrderForm}>
            Place Order
          </span>
          <span className="btn favorite" onClick={this.onAddToFavorite}>
            Collect
          </span>
          {isLogin && showOrderForm ? (
            <PlaceOrderForm
              merchantId={merchantId}
              showOrderForm={showOrderForm}
              onCloseOrderForm={this.closeOrderForm}
            />
          ) : null}
        </div>
      </Fragment>
    );
  }

  checkAuth = () => {
    const token = this.props.token;
    return new Promise((resolve, reject) => {
      if (token) {
        resolve();
      } else {
        window.alert('You are not login in, please login in!');
        navigate('/login');
        return reject();
      }
    });
  };

  showOrderForm = e => {
    this.checkAuth()
      .then(() => {
        this.setState({
          showOrderForm: true
        });
      })
      .catch(e => {
        console.log(e);
        window.alert((e && e.msg) || 'Place order failed!');
      });
  };

  closeOrderForm = e => {
    this.setState({
      showOrderForm: false
    });
  };

  onAddToFavorite = e => {
    api.addTofavoriate(this.props.merchantId).catch(e => {
      console.log(e);
      window.alert((e && e.msg) || 'Add to favoriate failed!');
    });
  };
}

BuyOrCollect.propTypes = {
  merchantId: PropTypes.string.isRequired
};

const mapStateToProps = ({ user }, ownProps) => {
  const { token } = user;
  const { merchantId } = ownProps;
  return {
    token,
    merchantId
  };
};

const mapDispatchToProps = (
  { user: { requestAddOrder, requestAddFavorite } },
  ownProps
) => {
  return {
    onPlaceOrder: requestAddOrder,
    onAddToFavorite: requestAddFavorite
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyOrCollect);
