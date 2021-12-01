import Button from "components/Button";
import React from "react";
import { useTranslation } from "react-i18next";
import click from "res/images/finger-click-illlustration.png";
import manageTaxesImage from "res/images/manageTaxesCTA.png";
import { openPopupWidget } from "react-calendly";
import { useUserData } from "userData";

const ManageTaxesCTA = () => {
  const { t, i18n } = useTranslation();
  const { userData } = useUserData();

  return (
    <div
      id="manageTaxesCTA"
      className="container-cta secondary-cta secondary-cta--manageTaxes flex-container"
    >
      <div className="cta-content cta-content--manageTaxes">
        <h2
          className="secondary-cta__header secondary-cta__header--manageTaxes"
          dangerouslySetInnerHTML={{
            __html: t("manageTaxes_cta_heading", {
              interpolation: { escapeValue: false },
            }),
          }}
        />
        <br />
        <p className="section-p cta-p cta-p--manageTaxes">
          {t("manageTaxes_cta_content", {
            interpolation: { escapeValue: false },
          })}
        </p>
        <div>
          <ul className="list list--check">
            <li>
              {t("manageTaxes_cta_list_1", {
                interpolation: { escapeValue: false },
              })}
            </li>
            <li>
              {t("manageTaxes_cta_list_2", {
                interpolation: { escapeValue: false },
              })}
            </li>
            <li>
              {t("manageTaxes_cta_list_3", {
                interpolation: { escapeValue: false },
              })}
            </li>
          </ul>
        </div>
      </div>
      <div className="manageTaxes-cta-img-wrapper">
        <img src={manageTaxesImage} alt="" className="cta-image--manageTaxes" />
      </div>
    </div>
  );
};

export default ManageTaxesCTA;
