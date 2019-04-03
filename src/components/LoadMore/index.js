import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import './style.scss';

export default class LoadMore extends Component {
  render() {
    let { isLoadingMore } = this.props;
    return (
      <div className="load-more" ref="wrapper">
        {isLoadingMore ? <span>Is loading, please wait...</span> : null}
      </div>
    );
  }

  componentDidMount() {
    const wrapper = this.refs.wrapper;
    let timeId;

    const callback = () => {
      const top = wrapper.getBoundingClientRect().top;
      const winHeight = window.screen.height;
      if (top && top < winHeight + 100) {
        this.props.onLoadMore();
      }
    };

    const onScroll = () => {
      if (this.props.isLoadingMore) return;
      if (timeId) {
        clearTimeout(timeId);
      }
      timeId = setTimeout(callback, 50);
    };

    this.onScroll = onScroll;
    window.addEventListener('scroll', this.onScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }
}

LoadMore.propsTypes = {
  isLoadingMore: PropTypes.bool.isRequired,
  onLoadMore: PropTypes.bool.isRequired
};
