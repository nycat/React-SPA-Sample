import React from 'react';
import { PropTypes } from 'prop-types';
import _ from 'lodash';

import './style.scss';

const SearchInput = ({
  onSearch,
  onChange,
  value = '',
  className = '',
  placeholder = 'Search something'
}) => {
  const handelKeyUp = e => {
    if (e.keyCode !== 13) {
      return;
    }
    onSearch();
  };

  return (
    <div className={`search-input ${className}`}>
      <i className="icon-search" />
      &nbsp;
      <input
        type="text"
        name={`input${_.random(1, 100)}`}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onKeyUp={handelKeyUp}
      />
    </div>
  );
};

SearchInput.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

export default SearchInput;
