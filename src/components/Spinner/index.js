import React from 'react';
import { css } from '@emotion/core';
import { ScaleLoader } from 'react-spinners';

import './style.scss';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const asyncLoadSpinner = () => (
  <div className="asyncloader-spinner">
    <ScaleLoader
      css={override}
      sizeUnit={'px'}
      size={150}
      color={'#e9203d'}
      loading={true}
    />
  </div>
);

export default asyncLoadSpinner;
