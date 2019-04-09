import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/Layout/header';
import MerchantList from '../../components/MerchantList';
import SearchInput from '../../components/SearchInput';
import * as helpers from '../../utils/helpers';

class Search extends Component {
  state = {
    keyword: '',
    category: '',
    tempKeyword: ''
  };

  static getDerivedStateFromProps(props, state) {
    const search = helpers.parseQuery(window.location.search);
    return {
      ...search
    };
  }

  render() {
    const { city } = this.props;
    const { category, keyword, tempKeyword } = this.state;
    return (
      <Fragment>
        <Header backTo={{ showBackTo: true }}>
          <SearchInput
            value={tempKeyword}
            onChange={this.updateKeword}
            onSearch={this.doSearch}
          />
        </Header>
        <MerchantList category={category} keyword={keyword} city={city} />
      </Fragment>
    );
  }

  updateKeword = e => {
    this.setState({
      tempKeyword: e.target.value
    });
  };

  doSearch = () => {
    const keyword = this.state.tempKeyword;
    this.setState({
      keyword
    });
  };
}

function mapStateToProps({ user }) {
  return {
    city: user.location
  };
}

export default connect(
  mapStateToProps,
  null
)(Search);
