import React, { Fragment, Component } from 'react';
import Header from '../../components/Layout/header';
import HomeCarousel from '../../components/HomeCarouse';
import { connect } from 'react-redux';
import { Link, navigate } from '@reach/router';
import YouMayLike from '../../components/YouMayLike';
import SearchInput from '../../components/SearchInput';

import './style.scss';

class Home extends Component {
  state = {
    keyword: ''
  };

  render() {
    const { location, isLogin } = this.props;
    return (
      <Fragment>
        <Header className="home-header">
          <Link to="/city" className="btn header-left city-link">
            <i className="icon-map-marker" />
            <span>{location}</span>
          </Link>
          <SearchInput
            onChange={this.updateKeword}
            onSearch={this.doSearch}
            value={this.state.keyword}
          />
          <Link to={isLogin ? '/user' : '/login'} className="btn header-right">
            <i className="icon-user" />
          </Link>
        </Header>
        <HomeCarousel />
        <YouMayLike />
      </Fragment>
    );
  }

  updateKeword = e => {
    this.setState({
      keyword: e.target.value
    });
  };

  doSearch = () => {
    const keyword = this.state.keyword;
    navigate(`/search?keyword=${keyword}`);
  };
}

const mapStateToProps = ({ app, user }, ownProps) => {
  const location =
    (user && user.location) || (app && app.hotCities && app.hotCities[0]);
  return {
    location: location,
    isLogin: !!(user && user.token)
  };
};
export default connect(
  mapStateToProps,
  null
)(Home);
