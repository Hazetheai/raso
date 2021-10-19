import React from "react";
import logo from "res/images/logo.svg";
import Hero, { sampleHeroData } from "./Hero";
import LanguagePicker from "./LanguagePicker";
import Nav from "./Nav";
import rasoBg from "res/images/top-section.png";

import "./header.css";
const Header = () => {
  return (
    <>
      <div className="top-section">
        <img src={rasoBg} alt="" className="top-section-raso-bg" />
        <header className="top-section__header">
          <a className="top-section__header__link" href="/">
            <img
              src={logo}
              className="top-section__header__logo"
              alt="Accountable"
            />
          </a>
          <Nav />
          <LanguagePicker />
        </header>
        <Hero {...sampleHeroData} />
      </div>
    </>
  );
};

export default Header;
