import React from 'react';
import { PropTypes } from 'prop-types';
import CommentItem from './Item';

import './style.scss';

const CommentList = ({ comments }) => (
  <ul className="comment-list">
    {comments.length ? (
      comments.map((comment, key) => (
        <li key={key}>
          <CommentItem comment={comment} />
        </li>
      ))
    ) : (
      <li>
        <p className="no-comments">No comments yet.</p>
      </li>
    )}
  </ul>
);

CommentList.propTypes = {
  comments: PropTypes.array.isRequired
};

export default CommentList;
