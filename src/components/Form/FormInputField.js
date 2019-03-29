import React from 'react';
import { PropTypes } from 'prop-types';

import './FormInputField.scss';

const FormInputField = props => {
  const {
    name,
    value,
    onChange,
    icon = null,
    type = 'text',
    placehoder = ''
  } = props;
  return (
    <div className="form-field text-input">
      {icon ? <i className={`icon ${icon}`} /> : null}
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placehoder || name}
        onChange={onChange}
      />
    </div>
  );
};

FormInputField.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default FormInputField;
