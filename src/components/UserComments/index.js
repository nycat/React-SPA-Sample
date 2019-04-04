import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import CommentList from './ComentList';
import * as api from '../../utils/api';
import LoadMore from '../LoadMore';

import './style.scss';

export default class UserComments extends Component {
  state = {
    meta: {
      isLoading: false,
      page: 1,
      size: 10,
      more: true
    },
    comments: []
  };

  render() {
    const { comments, meta } = this.state;
    const merchantId = Number(this.props.merchantId);
    return (
      <div className="user-comments">
        <h3 className="title">User Comments</h3>
        <CommentList comments={comments} merchantId={merchantId} />
        <LoadMore
          onLoadMore={this.fetchComments}
          isLoadingMore={meta.isLoading}
        />
      </div>
    );
  }

  fetchComments = () => {
    const merchantId = this.props.merchantId;
    const stateMeta = this.state.meta;
    const { page, size, more, isLoading } = this.state.meta;
    const comments = JSON.parse(JSON.stringify(this.state.comments));

    if (!more || isLoading) {
      return;
    }

    this.setState({ meta: { isLoading: true } });

    api
      .fetchMerchantComments(merchantId, { page, size })
      .then(({ meta, data }) => {
        const { more } = meta;
        const page = more ? stateMeta.page + 1 : stateMeta.page;
        this.setState({
          meta: {
            isLoading: false,
            page,
            size,
            more
          },
          comments: comments.concat(data)
        });
      })
      .catch(e => {
        console.log(e);
        window.alert('Fetch comments falied');
        this.setState({ meta: { isLoading: false } });
      });
  };

  componentDidMount() {
    this.fetchComments();
  }
}

CommentList.propTypes = {
  merchantId: PropTypes.number.isRequired
};
