import React, { Component } from 'react';
import { Link } from '@reach/router';
import { PropTypes } from 'prop-types';

export default class CatogeryItem extends Component {
  state = {
    logo: ''
  };

  render() {
    const name = this.props.item.name;
    const logo = this.state.logo;
    return (
      <Link to={`/search?category=${name}`} className={'catogery-item'}>
        <div className="logo" style={{ backgroundImage: `url(${logo})` }} />
        <span className="name">{name}</span>
      </Link>
    );
  }

  componentDidMount() {
    const loadImg = async () => {
      let logo = await Promise.resolve(
        import('../../static/imgs/' + this.props.item.logo).then(async img => {
          return img.default;
        })
      );
      this.setState({
        logo
      });
    };
    loadImg();
  }
}

CatogeryItem.propTypes = {
  item: PropTypes.object.isRequired
};
