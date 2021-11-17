import React from "react";
import { useTranslation } from "react-i18next";
import { useUserData } from "userData";
import { useUserInteraction } from "userInteraction";
import tax_offices from "res/FormData/de/tax_office.json";

const SuccessHero = () => {
  const { userInteraction, setUserInteraction } = useUserInteraction();

  const {
    userData: { personalFields, taxInfoFields, reviewFields },
  } = useUserData();

  const taxOffice = reviewFields?.taxOffice
    ? tax_offices.find((el) => el.value === reviewFields.taxOffice)?.name
    : "";

  const startdate = `${taxInfoFields.startdate.d}.${taxInfoFields.startdate.m}.${taxInfoFields.startdate.y}`;

  const { t } = useTranslation();
  return (
    <div
      className="top-section-estirev-container top-section-raso-congrats-container"
      id="rasoHeadCongrats"
    >
      <div className="raso-congrats">
        <h2
          className="section-h2 section-h2--raso-h2"
          dangerouslySetInnerHTML={{
            __html: t(`success_${userInteraction.version}_hero_title`, {
              interpolation: { escapeValue: false },
            }),
          }}
        />

        <p className="raso-congrats_p">
          {t(`success_${userInteraction.version}_hero_subtitle`)}
        </p>

        {userInteraction.version === "a" && (
          <div className="raso-congrats_address_box raso-a-section">
            <p className="raso-congrats_address raso-congrats_p raso-congrats_address--name">
              <strong>
                {personalFields.firstname + " " + personalFields.name ||
                  t(`success_${userInteraction.version}_hero_your_name`)}
              </strong>
            </p>
            <address className="raso-congrats_address raso-congrats_p raso-congrats_address--location">
              <span style={{ fontStyle: "initial" }}>🏠</span>{" "}
              {personalFields.address_street ? (
                <>
                  {personalFields.address_street}&nbsp;
                  {personalFields.address_number},&nbsp;
                  {personalFields.address_postcode}&nbsp;
                  {personalFields.address_city}
                </>
              ) : (
                t(`success_${userInteraction.version}_hero_your_address`)
              )}
            </address>
            <p className="raso-congrats_p raso-congrats_p--start">
              ⌛️ {t(`success_${userInteraction.version}_hero_start_from`)}
              {": "}
              {startdate}
              <span className="raso-congrats_p--start-date" />
            </p>
            <p className="raso-congrats_p raso-congrats_address--tax-office">
              🏢 {t(`success_${userInteraction.version}_hero_finanzamt_office`)}
              {": "}
              {taxOffice}
            </p>
          </div>
        )}
        <span className="raso-congrats_ticket">
          <span className="ticket-text">
            {t(`success_${userInteraction.version}_hero_ref_number`)}{" "}
          </span>{" "}
          <span id="tickedId">
            {userInteraction.ticketId ||
              userInteraction?.data?.data?.ticket ||
              ""}
          </span>
        </span>
      </div>
    </div>
  );
};

export default SuccessHero;
