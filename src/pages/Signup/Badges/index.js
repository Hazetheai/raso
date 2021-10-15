import React from 'react';
import './badges.css';
import BafinImg from './bafin.png';
import ElsterImg from './elster.png';
import HostedInGermanyImg from './hostedingermany.png';

const Badges = () => {
  return (
    <div className="badges">
      <img src={BafinImg} alt="Bafin" />
      <img src={HostedInGermanyImg} alt="Hosted in Germany" />
      <img src={ElsterImg} alt="ELSTER" />
    </div>
  );
};
export default Badges;
