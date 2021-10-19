import Badges from "components/Badges";
import Button from "components/Button";
import Link from "components/Link";
import Terms from "components/Terms";
import React from "react";
import checkmark from "res/images/checkmark.svg";
import "./hero.css";

const terms = [
  { imgSrc: checkmark, text: "Sichere Übertragung deiner Daten über Elster" },
  {
    imgSrc: checkmark,
    text: "Erhalte deine Steuernummer vom Finanzamt per Post",
  },
  { imgSrc: checkmark, text: "Komplett kostenlos" },
];

export const sampleHeroData = {
  h1: "Steuerliche Registrierung deiner Selbständigkeit",
  h3: `Melde dein Gewerbe oder deine Freiberuflichkeit direkt online, ohne
      den “Fragebogen zur steuerlichen Erfassung” ausfüllen zu müssen. Deine
      Steuernummer wird dir vom Finanzamt direkt nach Hause geschickt.`,
  terms,
  ctaText: "Anmeldung beginnen",
  ctaFunc: () => console.log("Clicked CTA"),
};

const Hero = ({ terms, h1, h3, ctaText, ctaLink, ctaFunc }) => {
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
            {ctaLink ? (
              <Link href={ctaLink} text={ctaText} func={ctaFunc} />
            ) : (
              <Button text={ctaText} func={ctaFunc} />
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
            Glückwunsch,
            <br /> der 1. Schritt ist getan...{" "}
          </span>
          <p className="raso-congrats_p">
            Du hast deine Selbständigkeit offiziell angemeldet!{" "}
          </p>
          {/* TODO */}
          <div className="raso-congrats_address_box raso-a-section">
            <address className="raso-congrats_address raso-congrats_address--name">
              <strong>Ihr Name</strong>
            </address>
            <address className="raso-congrats_address raso-congrats_address--location">
              <img
                draggable="false"
                className="emoji"
                alt="🏠"
                src="https://s.w.org/images/core/emoji/13.1.0/svg/1f3e0.svg"
              />{" "}
              Ihre Adresse
            </address>
            <p className="raso-congrats_p raso-congrats_p--start">
              <img
                draggable="false"
                className="emoji"
                alt="⌛️"
                src="https://s.w.org/images/core/emoji/13.1.0/svg/231b.svg"
              />{" "}
              Start zum<span className="raso-congrats_p--start-date"></span>
            </p>
            <p className="raso-congrats_p raso-congrats_address--tax-office">
              <img
                draggable="false"
                className="emoji"
                alt="🏢"
                src="https://s.w.org/images/core/emoji/13.1.0/svg/1f3e2.svg"
              />{" "}
              Adresse des Finanzamtes
            </p>
          </div>

          <span className="raso-congrats_ticket">
            Deine Referenz-Nr.: <span id="tickedId"></span>
          </span>
        </div>
      </div>
    </>
  );
};

export default Hero;
