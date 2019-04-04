import React, { Component } from 'react';
import { connect } from 'react-redux';
import MerchantList from '../MerchantList';
import * as api from '../../utils/api';
import LoadMore from '../LoadMore/index';

import './style.scss';

class YouMayLike extends Component {
  state = {
    recommendations: [],
    meta: {
      page: 1,
      more: true,
      isLoading: false,
      size: 10
    }
  };

  render() {
    const { recommendations } = this.state;
    return (
      <div className="you-may-like">
        <h3 className="title">You May Like</h3>
        <MerchantList merchants={recommendations} />
        <LoadMore
          onLoadMore={this.fetchMerchants}
          isLoading={this.state.meta.isLoading}
        />
      </div>
    );
  }

  fetchMerchants = () => {
    let { page, size = 10 } = this.state.meta;
    debugger;
    const query = {
      page,
      size
    };
    this.setState({
      meta: {
        isLoading: true
      }
    });
    api
      .getMerchants(query)
      .then(res => {
        const { meta, data } = res;
        const recommendations = JSON.parse(
          JSON.stringify(this.state.recommendations)
        );
        page = meta.more ? page + 1 : page;
        this.setState({
          recommendations: recommendations.concat(data),
          meta: {
            more: meta.more,
            page,
            size
          }
        });
      })
      .catch(e => {
        console.log(e);
        window.alert('Fetch recommendations failed');
      })
      .then(() => {
        this.setState({
          meta: {
            isLoading: false
          }
        });
      });
  };

  componentDidMount() {
    this.fetchMerchants();
  }
}

const mapStateToProps = ({ user }, ownProps) => {
  return {
    user
  };
};

export default connect(
  mapStateToProps,
  null
)(YouMayLike);
