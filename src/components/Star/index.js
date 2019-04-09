import React from 'react';
import { PropTypes } from 'prop-types';

import './style.scss';

const Star = ({ star, onChangeStar }) => {
  const starValue = star > 5 ? star % 5 : star;

  if (onChangeStar) {
    const handleClick = star => {
      const fn = e => {
        onChangeStar(star);
        e.stopPropagation();
      };
      return fn;
    };

    return (
      <p className="star">
        {[1, 2, 3, 4, 5].map((item, index) => {
          const lightClass = starValue >= item ? ' light' : '';
          return (
            <i
              key={index}
              className={'icon-star' + lightClass}
              onClick={handleClick(item)}
            />
          );
        })}
      </p>
    );
  }
  return (
    <p className="star">
      {[1, 2, 3, 4, 5].map((item, index) => {
        const lightClass = starValue >= item ? ' light' : '';
        return <i key={index} className={'icon-star' + lightClass} />;
      })}
    </p>
  );
};

PropTypes.propTypes = {
  star: PropTypes.number.isReuquired,
  onChangeStar: PropTypes.func
};

export default Star;
