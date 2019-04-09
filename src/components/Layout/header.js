import React from 'react';
import { navigate } from '@reach/router';

import './style.scss';

const Header = ({ className = '', children, title, backTo }) => {
  const handleClick = e => {
    if (backTo.path) {
      navigate(backTo.path);
    } else {
      window.history.back();
    }
  };

  return (
    <header className={`app-header ${className}`}>
      {backTo && backTo.showBackTo ? (
        <span className="back-icon header-left" onClick={handleClick}>
          <i className="icon-chevron-left" />
        </span>
      ) : null}
      {title ? <h3 className="title">{title}</h3> : children}
    </header>
  );
};

export default Header;
