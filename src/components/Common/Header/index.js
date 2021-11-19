import React from "react";
import logo from "res/images/logo.svg";
import Hero from "./Hero";
import LanguagePicker from "./LanguagePicker";
import Nav from "./Nav";
import rasoBg from "res/images/top-section.png";
import checkmark from "res/images/checkmark.svg";
import "./header.css";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";
import clsx from "clsx";
import Button from "components/Button";
import { cleanLocal } from "res/lib";

const Header = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
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
    ctaFunc: () => document.querySelector(".content")?.scrollIntoView(),
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
        {isSuccess ? null : (
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
          <Button
            func={(e) => {
              if (e.metaKey) {
                cleanLocal();
                window.location.reload();
              }
            }}
            text="Reset Form Data"
            className="fix-top-r"
          />
        </header>
        <Hero {...heroData} isSuccessPage={isSuccess} />
      </div>
    </>
  );
};

export default Header;
