import React, { Component } from 'react';
import Header from '../../components/Layout/header';
import MerchantInfo from '../../components/MerchantInfo';
import UserComments from '../../components/UserComments';
import BuyOrCollect from '../../components/BuyOrCollect';
import * as api from '../../utils/api';

export default class Merchant extends Component {
  state = {
    id: null,
    merchantInfo: {}
  };

  static getDerivedStateFromProps(props, state) {
    return {
      id: props.merchantId
    };
  }

  render() {
    const { merchantInfo, id } = this.state;
    return (
      <div>
        <Header title="Merchant Info" backTo={{ showBackTo: true }} />
        <MerchantInfo merchant={merchantInfo} />
        <BuyOrCollect merchantId={id} />
        <UserComments merchantId={id} />
      </div>
    );
  }

  componentDidMount() {
    const merchantId = this.state.id;
    api
      .fetchMerchantInfo(merchantId)
      .then(({ data }) => {
        this.setState({
          merchantInfo: data
        });
      })
      .catch(e => {
        console.log(e);
        window.alert('Fetch merchant infomation failed!');
      });
  }
}
