import clsx from 'clsx';
import React from 'react';
import './subheadline.css';

const Subheadline = ({ children, centered }) => (
  <h2 className='subheadline'>
    {children}
  </h2>
);

export default Subheadline;
