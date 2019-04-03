import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import CommentList from './ComentList';
import * as api from '../../utils/api';
import LoadMore from '../LoadMore';

import './style.scss';

export default class UserComments extends Component {
  state = {
    comments: []
  };

  render() {
    const { comments } = this.state;
    return (
      <div className="user-comments">
        <h3 className="title">User Comments</h3>
        <CommentList comments={comments} merchantId={1} />
        <LoadMore />
      </div>
    );
  }

  fetchComments = merchantId => {
    api
      .fetchMerchantComments(merchantId)
      .then(({ meta, data }) => {
        this.setState({
          comments: data
        });
      })
      .catch(e => {
        window.alert('Fetch comments falied');
        console.log(e);
      });
  };

  componentDidMount() {
    this.fetchComments(this.props.merchantId);
  }
}

CommentList.propTypes = {
  merchantId: PropTypes.number.isRequired
};
