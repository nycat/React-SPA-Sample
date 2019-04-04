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
        <LoadMore />
      </Fragment>
    );
  }

  fetchMerchants = async () => {
    let query = {
      page: this.state.meta.page,
      size: this.state.meta.size,
      keywords: this.props.keywords,
      category: this.props.category
    };
    query = helpers.clean(query);
    const { meta, data } = await api.fetchMerchants(query).catch(e => {
      console.log(e, query);
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
}

MerchantList.propTypes = {
  keywords: PropTypes.string,
  category: PropTypes.string
};
