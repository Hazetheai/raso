import React from "react";
import LogoImg from "res/images/logo.svg";
import "./logo.css";

const Logo = () => (
  <div className="header">
    <img src={LogoImg} alt="Accountable" className="header_logo" />
  </div>
);

export default Logo;
