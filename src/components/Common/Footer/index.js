import React from "react";
import "./footer.css";
const Footer = () => {
  return (
    <footer className="section section--footer">
      <div className="container">
        <div className="flex-container flex-container--footer">
          <div className="footer-fcol">
            <a href="/">
              <img
                src="https://www.accountable.de/wp-content/themes/accountable/assets/images/accountable-logo.svg"
                className="img-fluid section__img section__img--logo"
              />
            </a>
            <div>
              <a
                href="https://facebook.com/getaccountable"
                target="_blank"
                rel="noopener"
                title="Accountable on Facebook"
              >
                <img
                  className="footer-social"
                  src="https://www.accountable.de/wp-content/themes/accountable/assets/images/social/facebook.svg"
                />
              </a>
              <a
                href="https://instagram.com/accountable.eu/"
                target="_blank"
                rel="noopener"
                title="Accountable on Instagram"
              >
                <img
                  className="footer-social"
                  src="https://www.accountable.de/wp-content/themes/accountable/assets/images/social/instagram.svg"
                />
              </a>
              <a
                href="https://www.linkedin.com/company/accountableselfemployed/"
                target="_blank"
                rel="noopener"
                title="Accountable on LinkedIn"
              >
                <img
                  className="footer-social"
                  src="https://www.accountable.de/wp-content/themes/accountable/assets/images/social/linkedin.svg"
                />
              </a>
            </div>
            <a
              href="https://de.trustpilot.com/review/getaccountable.eu"
              className="footer-trustpilot"
            >
              <span>24 Bewertungen</span>
              <br />
              <img
                src="https://www.accountable.de/wp-content/themes/accountable/assets/images/homepage/trustpilot-badge.png"
                width="185px"
                className="img-fluid"
              />
            </a>
          </div>
          <div className="footer-col">
            <h3 className="section__title-footer">Unser Angebot</h3>
            <a
              className="section__a"
              href="/steuernummer-online-beantragen/"
              target="_parent"
            >
              Steuernummer beantragen
            </a>
            <a className="section__a" href="/preise/" target="_parent">
              Preise
            </a>
            <a className="section__a" href="/steuerberater/" target="_parent">
              Steuerberatung
            </a>
            <a className="section__a" href="/blog/" target="_parent">
              Steuertipps
            </a>
          </div>
          <div className="footer-col">
            <h3 className="section__title-footer">Hilfen für Selbständige</h3>
            <a
              className="section__a"
              href="https://kannichdasabsetzen.accountable.de/"
              target="_parent"
            >
              Kann ich das absetzen?
            </a>
            <a
              className="section__a"
              href="/rechnung-online-erstellen/"
              target="_parent"
            >
              Kostenlose Rechnungsvorlage
            </a>
            <a
              className="section__a"
              href="/angebot-online-erstellen/"
              target="_parent"
            >
              Kostenlose Angebotsvorlage
            </a>
            <a className="section__a" href="/steuer-rechner/" target="_parent">
              Steuerrechner
            </a>
          </div>
          <div className="footer-col">
            <h3 className="section__title-footer">Company</h3>
            <a className="section__a" href="/uber-uns/" target="_parent">
              Über uns{" "}
            </a>
            <a
              className="section__a"
              href="https://angel.co/accountable-2/jobs/"
              rel="noopener"
            >
              Jobs
            </a>
            <a className="section__a" href="/privacy/">
              Datenschutz
            </a>
            <a className="section__a" href="/cookie-policy/">
              Cookie-Richtlinie
            </a>
          </div>
          <div className="footer-col">
            <h3 className="section__title-footer">Hilfe &amp; Kontakt</h3>
            <a
              className="section__a"
              href="https://help.accountable.eu/en/"
              rel="noopener"
              target="_parent"
            >
              FAQ
            </a>
            <a
              className="section__a"
              href="mailto:hello@getaccountable.eu"
              rel="noopener"
              target="_parent"
            >
              Kontakt
            </a>
            <a className="section__a " href="/impressum/">
              Impressum
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
