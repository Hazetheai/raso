import Button from "components/Button";
import React from "react";
import { useTranslation } from "react-i18next";
import click from "res/images/finger-click-illlustration.png";
import tino from "res/images/tino-cta.png";
import { openPopupWidget } from "react-calendly";
import { useUserData } from "data-layer/userData";

const SecondaryCTA = () => {
  const { t, i18n } = useTranslation();
  const { userData } = useUserData();
  const calendly_link_base = "https://calendly.com/accountable-eu";
  const calendly_lang =
    i18n.language === "en"
      ? "registration-as-selfemployed"
      : "registrierung-als-selbststandige-r";
  const calendly_link = calendly_link_base + "/" + calendly_lang;

  const url = calendly_link;
  const pageSettings = {};
  const utm = {};
  const prefill = {
    email: userData.email,
    name: `${userData.firstname} ${userData.name || ""}`,
    customAnswers: {
      a1: userData.phone,
    },
    date: new Date(Date.now() + 86400000),
  };

  return (
    <div
      id="calendlyCallCta"
      className="container-cta secondary-cta flex-container"
    >
      <div className=" cta-content">
        <h2
          className="secondary-cta__header"
          dangerouslySetInnerHTML={{
            __html: t("calendly_cta_heading", {
              interpolation: { escapeValue: false },
            }),
          }}
        />
        <br />
        <p className="section-p cta-p">
          {t("calendly_cta_content", {
            interpolation: { escapeValue: false },
          })}
        </p>
        <div>
          <br />

          <Button
            className="body--big-bold pulse"
            text={t("calendly_cta_action_element")}
            func={() => openPopupWidget({ url, prefill, pageSettings, utm })}
          />

          <br />
          <br />
        </div>
      </div>
      <div className="secondary-cta-img-wrapper">
        <img src={click} alt="Clicking Fingers" className="cta-fingers" />
        <img src={tino} alt="Tino Keller" className="cta-tino" />
      </div>
    </div>
  );
};

export default SecondaryCTA;
