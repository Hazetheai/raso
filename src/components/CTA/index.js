import Button from "components/Button";
import Link from "components/Link";
import Terms from "components/Terms";
import React from "react";
import pinkStars from "res/images/pink_stars.svg";
import { useUserInteraction } from "userInteraction";
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
  const { userInteraction } = useUserInteraction();
  return (
    <section className="section-cta">
      <div className="container-cta container-cta--main">
        <img src={mainImageSrc} alt="Accounting team" className="cta-image" />
        <h4 className="cta-h4">
          <img src={pinkStars} alt={preHeadline} /> {preHeadline}
        </h4>
        <h2 className="section-h2--cta-h2">{headline}</h2>

        <p className="section-p cta-p">{subheadline}</p>
        <div className="mobile-only">
          {isButton ? (
            <Button
              id="downloadAppLink"
              func={action}
              text={mobileActionElementText}
            />
          ) : (
            <Link
              href={mobileActionElementLink}
              func={action}
              text={mobileActionElementText}
              target="_blank"
              id="downloadAppLink"
            />
          )}
        </div>
        <div className="desktop-only">
          {isButton ? (
            <Button func={action} text={desktopActionElementText} />
          ) : (
            <Link
              href={desktopActionElementLink}
              func={action}
              text={desktopActionElementText}
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
