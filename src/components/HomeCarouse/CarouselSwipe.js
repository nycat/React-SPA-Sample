import React from 'react';
import { PropTypes } from 'prop-types';

import CategoryItem from './CategoryItem';

const CarouselSwipe = ({ items }) => {
  return (
    <div className="category">
      {items.map(item => {
        return <CategoryItem item={item} key={item.logo} />;
      })}
    </div>
  );
};

CarouselSwipe.propTypes = {
  items: PropTypes.array.isRequired
};

export default CarouselSwipe;
