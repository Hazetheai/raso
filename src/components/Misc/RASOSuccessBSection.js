import { ExternalLink } from "components/Link";
import Quotes from "components/Quotes";
import { useUserInteraction } from "data-layer/userInteraction";
import React from "react";
import { useTranslation } from "react-i18next";
import "./raso-b-section.css";

const RASOSuccessBSection = () => {
  const { userInteraction, setUserInteraction } = useUserInteraction();

  const { t } = useTranslation();
  return (
    <div className="raso-nextstep" id="rasoFormSubmitted">
      <div className="raso-nextstep_instructions">
        {/* B Section */}
        <span className="section-h2 section-h2--raso-b-section raso-b-section">
          {t("success_b_body_title", {
            interpolation: { escapeValue: false },
          })}{" "}
        </span>
        <p
          className="raso-congrats_p raso-b-section"
          dangerouslySetInnerHTML={{
            __html: t("success_b_body_subtitle", {
              interpolation: { escapeValue: false },
            }),
          }}
        />
        {userInteraction.nextVatDeadline?.showChargeVat && (
          <p
            className="raso-congrats_p raso-b-section"
            id="rasoSubmittedSubjectToVAT"
            dangerouslySetInnerHTML={{
              __html: t("success_b_body_subtitle_2", {
                nextVatDeadline: userInteraction.nextVatDeadline?.vatDeadline,
                interpolation: { escapeValue: false },
              }),
            }}
          />
        )}
        <p className="raso-congrats_p raso-b-section">
          All required documentation is waiting for you here:{" "}
        </p>

        <div className={"raso-congrats--b-section__cta"}>
          <ExternalLink
            target="_blank"
            rel="noopener"
            text={t("form_continue")}
            href={
              userInteraction.downloadAppLink_desktop ??
              "http://onboarding.accountable.de/en/"
            }
            className="desktop-only pulse"
          />
          <ExternalLink
            rel="noopener"
            target="_blank"
            text={t("form_continue")}
            href={userInteraction.downloadAppLink_mobile ?? ""}
            className="mobile-only pulse"
          />
        </div>
        <Quotes />
      </div>
    </div>
  );
};

export default RASOSuccessBSection;
