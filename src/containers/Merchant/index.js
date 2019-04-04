import React, { Component } from 'react';
import Header from '../../components/Layout/header';
import MerchantInfo from '../../components/MerchantInfo';
import UserComments from '../../components/UserComments';
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
        <Header title="Merchant Info" />
        <MerchantInfo merchant={merchantInfo} />
        <UserComments merchantId={id} />
      </div>
    );
  }

  componentDidMount() {
    const merchantId = this.state.id;
    api
      .fetchMerchantInfo(merchantId)
      .then(({ meta, data }) => {
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
