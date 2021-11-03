import React from "react";
import "./badges.css";
import BafinImg from "./bafin.png";
import ElsterImg from "./elster.png";
import HostedInGermanyImg from "./hostedingermany.png";

const Badges = () => {
  return (
    <div className="badges">
      <img src={BafinImg} alt="Bafin" className="bafin" />
      <img
        src={HostedInGermanyImg}
        alt="Hosted in Germany"
        className="hosted-in-germany"
      />
      <img src={ElsterImg} alt="ELSTER" className="elster" />
    </div>
  );
};
export default Badges;
