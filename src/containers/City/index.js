import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/Layout/header';
import CityList from '../../components/CityList';
import CurrentCity from '../../components/CurrentCity';

class City extends Component {
  render() {
    const { hotCities, currentCity } = this.props;
    return (
      <Fragment>
        <Header title="City" />
        <CurrentCity city={currentCity} />
        <CityList hotCities={hotCities} onClickCity={this.changeCity} />
      </Fragment>
    );
  }

  changeCity = e => {
    e.stopPropagation();
    this.props.updateLocation(e.target.innerHTML);
  };
}

const mapStateToProps = ({ app, user }, ownProps) => {
  return {
    hotCities: app.hotCities || [],
    currentCity:
      user.location || (app.hotCities && app.hotCities[0]) || 'New York, NY'
  };
};

const mapDispatchToProps = ({ user }, ownProps) => {
  return {
    updateLocation: user.asyncUpdateUserLocation
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(City);
