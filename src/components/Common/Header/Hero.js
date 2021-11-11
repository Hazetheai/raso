import clsx from "clsx";
import Badges from "components/Badges";
import Button from "components/Button";
import Link from "components/Link";
import Terms from "components/Terms";
import React from "react";
import { useTranslation } from "react-i18next";

import { useUserInteraction } from "userInteraction";
import "./hero.css";

const Hero = ({ terms, h1, h3, ctaText, ctaLink, ctaFunc }) => {
  const { userInteraction, setUserInteraction } = useUserInteraction();
  const { t } = useTranslation();
  return (
    <>
      <div className="top-section-raso-container container" id="rasoHead">
        <h1 className="top-section__title-l">{h1}</h1>
        {h3 && (
          <h3 className="top-section__title-m top-section__title-m--raso">
            {h3}
          </h3>
        )}
        {terms && <Terms vertical offerPromises={terms} />}
        {ctaText && (
          <>
            {userInteraction.startedFilling ? null : ctaLink ? (
              <Link
                href={ctaLink}
                text={ctaText}
                func={ctaFunc}
                className={clsx(
                  "body--big-bold",
                  "form_submit_btn--raso-header"
                )}
              />
            ) : (
              <Button
                text={ctaText}
                func={ctaFunc}
                className={clsx(
                  "body--big-bold",
                  "form_submit_btn--raso-header"
                )}
              />
            )}
          </>
        )}
        <br />
        <br />
        <Badges />
      </div>
      <div
        className="top-section-estirev-container top-section-raso-congrats-container"
        id="rasoHeadCongrats"
        style={{ display: "none" }}
      >
        <div className="raso-congrats">
          <span className="section-h2 raso-h2">
            {t("success_a_hero_title")}
          </span>
          <p className="raso-congrats_p">{t("")}</p>
          {/* TODO - Success Page */}
          <div className="raso-congrats_address_box raso-a-section">
            <address className="raso-congrats_address raso-congrats_address--name">
              <strong>{t("success_a_hero_your_name")}</strong>
            </address>
            <address className="raso-congrats_address raso-congrats_address--location">
              <img
                draggable="false"
                className="emoji"
                alt="🏠"
                src="https://s.w.org/images/core/emoji/13.1.0/svg/1f3e0.svg"
              />{" "}
              {t("success_a_hero_your_address")}
            </address>
            <p className="raso-congrats_p raso-congrats_p--start">
              <img
                draggable="false"
                className="emoji"
                alt="⌛️"
                src="https://s.w.org/images/core/emoji/13.1.0/svg/231b.svg"
              />{" "}
              {t("success_a_hero_start_from")}
              <span className="raso-congrats_p--start-date"></span>
            </p>
            <p className="raso-congrats_p raso-congrats_address--tax-office">
              <img
                draggable="false"
                className="emoji"
                alt="🏢"
                src="https://s.w.org/images/core/emoji/13.1.0/svg/1f3e2.svg"
              />{" "}
              {t("success_a_hero_finanzamt_office")}
            </p>
          </div>

          <span className="raso-congrats_ticket">
            {t("success_a_hero_ref_number")} <span id="tickedId"></span>
          </span>
        </div>
      </div>
    </>
  );
};

export default Hero;
