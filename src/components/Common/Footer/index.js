import React from "react";
import { useTranslation } from "react-i18next";
import "./footer.css";
const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="section section--footer ">
      <div className="container">
        <div className="flex-container flex-container--footer">
          <div className="footer-fcol">
            <a href="/">
              <img
                alt=""
                src="https://www.accountable.de/wp-content/themes/accountable/assets/images/accountable-logo.svg"
                className="img-fluid section__img section__img--logo"
              />
            </a>
            <div className="flex-container">
              <a
                href="https://facebook.com/getaccountable"
                target="_blank"
                rel="noopener"
                title={t("footer_facebook_label")}
              >
                <img
                  alt=""
                  className="footer-social"
                  src="https://www.accountable.de/wp-content/themes/accountable/assets/images/social/facebook.svg"
                />
              </a>
              <a
                href="https://instagram.com/accountable.eu/"
                target="_blank"
                rel="noopener"
                title={t("footer_instagram_label")}
              >
                <img
                  alt=""
                  className="footer-social"
                  src="https://www.accountable.de/wp-content/themes/accountable/assets/images/social/instagram.svg"
                />
              </a>
              <a
                href="https://www.linkedin.com/company/accountableselfemployed/"
                target="_blank"
                rel="noopener"
                title={t("footer_linkin_label")}
              >
                <img
                  alt=""
                  className="footer-social"
                  src="https://www.accountable.de/wp-content/themes/accountable/assets/images/social/linkedin.svg"
                />
              </a>
            </div>
            <a
              href="https://de.trustpilot.com/review/getaccountable.eu"
              className="footer-trustpilot"
            >
              <span>24 {t("footer_trustpilot_num_reviews")}</span>
              <br />
              <img
                alt=""
                src="https://www.accountable.de/wp-content/themes/accountable/assets/images/homepage/trustpilot-badge.png"
                width="185px"
                className="img-fluid"
              />
            </a>
          </div>
          <div className="footer-col">
            <h3 className="section__title-footer">
              {t("footer_menu_product_heading_label")}
            </h3>
            <a
              className="section__a"
              href={t("footer_menu_product_01_link")}
              target="_parent"
            >
              {t("footer_menu_product_01_label")}
            </a>
            <a
              className="section__a"
              href={t("footer_menu_product_02_link")}
              target="_parent"
            >
              {t("footer_menu_product_02_label")}
            </a>
            <a
              className="section__a"
              href={t("footer_menu_product_03_link")}
              target="_parent"
            >
              {t("footer_menu_product_03_label")}
            </a>
            <a
              className="section__a"
              href={t("footer_menu_product_04_link")}
              target="_parent"
            >
              {t("footer_menu_product_04_label")}
            </a>
          </div>
          <div className="footer-col">
            <h3 className="section__title-footer">
              {t("footer_menu_tools_heading_label")}
            </h3>
            <a
              className="section__a"
              href={t("footer_menu_tools_01_link")}
              target="_parent"
            >
              {t("footer_menu_tools_01_label")}
            </a>
            <a
              className="section__a"
              href={t("footer_menu_tools_02_link")}
              target="_parent"
            >
              {t("footer_menu_tools_02_label")}
            </a>
            <a
              className="section__a"
              href={t("footer_menu_tools_03_link")}
              target="_parent"
            >
              {t("footer_menu_tools_03_label")}
            </a>
            <a
              className="section__a"
              href={t("footer_menu_tools_04_link")}
              target="_parent"
            >
              {t("footer_menu_tools_04_label")}
            </a>
          </div>
          <div className="footer-col">
            <h3 className="section__title-footer">
              {t("footer_menu_company_heading_label")}
            </h3>
            <a
              className="section__a"
              href={t("footer_menu_company_01_link")}
              target="_parent"
            >
              {t("footer_menu_company_01_label")}
            </a>
            <a
              className="section__a"
              href={t("footer_menu_company_02_link")}
              rel="noopener"
            >
              {t("footer_menu_company_02_label")}
            </a>
            <a className="section__a" href={t("footer_menu_company_03_link")}>
              {t("footer_menu_company_03_label")}
            </a>
            <a className="section__a" href={t("footer_menu_company_04_link")}>
              {t("footer_menu_company_04_label")}
            </a>
          </div>
          <div className="footer-col">
            <h3 className="section__title-footer">
              {t("footer_menu_help_heading_label")}
            </h3>
            <a
              className="section__a"
              href={t("footer_menu_help_01_link")}
              rel="noopener"
              target="_parent"
            >
              {t("footer_menu_help_01_label")}
            </a>
            <a
              className="section__a"
              href={t("footer_menu_help_02_link")}
              rel="noopener"
              target="_parent"
            >
              {t("footer_menu_help_02_label")}
            </a>
            <a className="section__a " href={t("footer_menu_help_03_link")}>
              {t("footer_menu_help_03_label")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
