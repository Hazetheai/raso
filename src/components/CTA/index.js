import Button from "components/Button";
import Link from "components/Link";
import Terms from "components/Terms";
import React from "react";
import { useTranslation } from "react-i18next";
import pinkStars from "res/images/pink_stars.svg";
import "./cta.css";

const CTA = ({
  preHeadline,
  mainImageSrc,
  headline,
  subheadline,
  mobileActionElementLink,
  mobileActionElementText,
  desktopActionElementLink,
  desktopActionElementText,
  action,
  isButton,
  offerPromises,
}) => {
  const { t } = useTranslation();

  return (
    <section className="section-cta">
      <div className="container-cta container-cta--main">
        <img src={mainImageSrc} alt="Accounting team" className="cta-image" />
        <h4 className="cta-h4">
          <img src={pinkStars} alt={t(preHeadline)} /> {t(preHeadline)}
        </h4>
        <h2 className="section-h2--cta-h2">{t(headline)}</h2>

        <p className="section-p cta-p">{t(subheadline)}</p>
        <div className="mobile-only">
          {isButton ? (
            <Button
              id="downloadAppLink"
              func={action}
              text={t(mobileActionElementText)}
            />
          ) : (
            <Link
              href={mobileActionElementLink}
              func={action}
              text={t(mobileActionElementText)}
              target="_blank"
              id="downloadAppLink"
            />
          )}
        </div>
        <div className="desktop-only">
          {isButton ? (
            <Button func={action} text={t(desktopActionElementText)} />
          ) : (
            <Link
              href={desktopActionElementLink}
              func={action}
              text={t(desktopActionElementText)}
              target="_blank"
              id="downloadAppLink"
            />
          )}
        </div>
        <Terms offerPromises={offerPromises} />
      </div>
    </section>
  );
};

export default CTA;
