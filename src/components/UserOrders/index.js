import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import OrderList from './OrderList';
import * as api from '../../utils/api';
import LoadMore from '../../components/LoadMore';

import './style.scss';

class UserOrders extends Component {
  state = {
    orders: [],
    meta: {
      isLoading: false,
      page: 1,
      size: 10,
      more: true
    }
  };

  render() {
    const orders = this.state.orders;
    return (
      <Fragment>
        <div className="user-orders">
          <h3 className="title">Your Orders</h3>
          <div>
            {orders.length ? (
              <OrderList orders={orders} />
            ) : (
              <p className="no-order">You have not have any orders yet!</p>
            )}
          </div>
          <LoadMore
            onLoadMore={this.fetchUserOrders}
            isLoading={this.state.meta.isLoading}
          />
        </div>
      </Fragment>
    );
  }

  fetchUserOrders = async () => {
    const orders = JSON.parse(JSON.stringify(this.state.orders));
    const query = this.state.meta;
    delete query.more;
    delete query.isLoading;

    this.setState({
      meta: {
        isLoading: true
      }
    });
    const { meta, data } = await api.fetchUserOrders(query).catch(e => {
      window.alert('Fetch orders data failed!');
      console.log(e);
      return {
        meta: {
          more: false
        },
        data: []
      };
    });
    this.setState({
      meta: {
        ...meta,
        more: meta.more,
        page: meta.more ? query.page + 1 : query.page,
        size: query.size,
        isLoading: false
      },
      orders: orders.concat(data)
    });
  };

  componentDidMount() {
    this.fetchUserOrders();
  }
}

function mapStateToProps({ user }) {
  return {
    user
  };
}

export default connect(
  mapStateToProps,
  null
)(UserOrders);
