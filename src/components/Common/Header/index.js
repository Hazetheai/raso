import React from "react";
import logo from "res/images/logo.svg";
import Hero from "./Hero";
import LanguagePicker from "./LanguagePicker";
import Nav from "./Nav";
import rasoBg from "res/images/top-section.png";
import checkmark from "res/images/checkmark.svg";
import "./header.css";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t } = useTranslation();
  const terms = [
    { imgSrc: checkmark, text: t("hero_term_1") },
    {
      imgSrc: checkmark,
      text: t("hero_term_2"),
    },
    { imgSrc: checkmark, text: t("hero_term_3") },
  ];

  const heroData = {
    h1: t("hero_title"),
    h3: t("hero_subtitle"),
    terms,
    ctaText: t("hero_ctaText"),
    ctaFunc: () => document.querySelector(".content")?.scrollIntoView(),
  };
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
        <Hero {...heroData} />
      </div>
    </>
  );
};

export default Header;
