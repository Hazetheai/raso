import React from "react";
import { useTranslation } from "react-i18next";

const Nav = () => {
  const { t } = useTranslation();
  return (
    <nav className="top-section__nav desktop-only menu-header-menu-de-container">
      <ul className="top-section__header__ul">
        <li className="menu-item">
          <a href={t("nav_link_1")}>{t("nav_label_1")}</a>
        </li>
        <li className="menu-item">
          <a href={t("nav_link_2")}>{t("nav_label_2")}</a>
        </li>
        <li className="menu-item">
          <a href={t("nav_link_3")}>{t("nav_label_4")}</a>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
