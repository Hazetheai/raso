import clsx from "clsx";
import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";
import checkmark from "res/images/checkmark.svg";
import logo from "res/images/logo.svg";
import rasoBg from "res/images/top-section.png";
import { useUserInteraction } from "userInteraction";
import { useUserTesting } from "userTesting";
import "./header.css";
import Hero from "./Hero";
import LanguagePicker from "./LanguagePicker";
import Nav from "./Nav";

const Header = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const { userInteraction, setUserInteraction } = useUserInteraction();
  const { userTesting, setuserTesting } = useUserTesting();
  const isSuccess = /success|erfolg/gi.test(pathname);

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
    ctaFunc: () => {
      setUserInteraction({ clickedStart: true });
      if (document.querySelector(".content")) {
        document
          .querySelector(".content")
          .scrollIntoView({ behavior: "smooth" });
      }
    },
  };
  return (
    <>
      <div className={clsx("top-section")}>
        <div
          className={clsx(
            "top-section-gradient",
            isSuccess && "top-section-gradient--raso-success"
          )}
        />
        {isSuccess ? null : userTesting.videoSection === "a" ? null : (
          <img src={rasoBg} alt="" className="top-section-raso-bg" />
        )}
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
        <Hero {...heroData} isSuccessPage={isSuccess} />
      </div>
    </>
  );
};

export default Header;
