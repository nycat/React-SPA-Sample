import React, { Component, Fragment } from 'react';
import { Link } from '@reach/router';
import { PropTypes } from 'prop-types';
import MerchantItem from './Item';
import LoadMore from '../../components/LoadMore';
import * as helpers from '../../utils/helpers';
import lodash from 'lodash';
import * as api from '../../utils/api';

import './style.scss';

export default class MerchantList extends Component {
  state = {
    merchants: [],
    meta: {
      page: 1,
      size: 10,
      isLoading: false,
      more: true
    }
  };

  render() {
    const merchants = this.state.merchants;
    return (
      <Fragment>
        <ul className="merchant-list">
          {merchants.map(merchant => (
            <li key={merchant.id}>
              <Link to={`/merchant/${merchant.id}`} className="to-merchant">
                <MerchantItem merchant={merchant} />
              </Link>
            </li>
          ))}
        </ul>
        <LoadMore
          onLoadMore={this.fetchMerchants}
          isLoading={this.state.meta.isLoading}
        />
      </Fragment>
    );
  }

  fetchMerchants = async () => {
    if (this.state.meta.isLoading || !this.state.meta.more) {
      return;
    }

    const query = helpers.clean({
      page: this.state.meta.page,
      size: this.state.meta.size,
      keyword: this.props.keyword,
      category: this.props.category,
      city: this.props.city
    });
    const { meta, data } = await api.fetchMerchants(query).catch(e => {
      window.alert('Fetch merchant list failed!');
    });

    const merchants = lodash.cloneDeep(this.state.merchants);
    this.setState({
      meta: {
        isLoading: false,
        page: meta.more ? query.page + 1 : query.page,
        more: meta.more,
        size: query.size
      },
      merchants: merchants.concat(data)
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const curKeyword = this.props.keyword;
    const curCity = this.props.city;
    const curCategory = this.props.category;

    const prevKeyword = prevProps.keyword;
    const prevCity = prevProps.city;
    const prevCategory = prevProps.category;

    if (
      curKeyword !== prevKeyword ||
      curCategory !== prevCategory ||
      curCity !== prevCity
    ) {
      this.setState(
        {
          meta: {
            size: 10,
            page: 1,
            more: true,
            isLoading: false
          },
          merchants: []
        },
        () => {
          this.fetchMerchants();
        }
      );
    }
  }

  componentDidMount() {
    this.fetchMerchants();
  }
}

MerchantList.propTypes = {
  keyword: PropTypes.string,
  category: PropTypes.string,
  city: PropTypes.string
};
