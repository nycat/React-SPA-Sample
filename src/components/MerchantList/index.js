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

  static getDerivedStateFromProps(props, state) {
    const category = helpers.parseQuery(window.location.search)['category'];
    if (props.keywords) {
      return {
        category
      };
    } else {
      return null;
    }
  }

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
      keywords: this.props.keywords,
      category: helpers.parseQuery(window.location.search)['category'],
      city: this.props.city
    });
    const merchants = lodash.cloneDeep(this.state.merchants);

    const { meta, data } = await api.fetchMerchants(query).catch(e => {
      window.alert('Fetch merchant list failed!');
    });

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

  componentDidMount() {
    this.fetchMerchants();
  }
}

MerchantList.propTypes = {
  keywords: PropTypes.string,
  category: PropTypes.string,
  city: PropTypes.string
};
