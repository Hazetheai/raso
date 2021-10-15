import clsx from 'clsx';
import React from 'react';
import './headline.css';

const Headline = ({ children, centered }) => (
  <h1 className={clsx('headline', centered && 'headline--center')}>
    {children}
  </h1>
);

export default Headline;
