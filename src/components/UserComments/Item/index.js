import React from 'react';
import { PropTypes } from 'prop-types';
import Star from '../../Star';

import './style.scss';

const CommentItem = ({ comment }) => {
  let { nickname, star, content } = comment;
  if (!content) {
    star = 5;
    content =
      'User have not left a comment for his order. Five stars by default!';
  }
  return (
    <div className="comment-item">
      <h4 className="username">
        <i className="icon-user" />
        &nbsp;
        <strong>{nickname}</strong>
      </h4>
      <Star star={star} />
      <p>{content}</p>
    </div>
  );
};

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired
};

export default CommentItem;