import React from "react";
import pinkStars from "res/images/pink_stars.svg";
import Link from "components/Link";
import Button from "components/Button";
import "./cta.css";
import Terms from "components/Terms";

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
  return (
    <section className="section-cta">
      <div className="container-cta">
        <img src={mainImageSrc} alt="Accounting team" className="cta-image" />
        <h4 className="cta-h4">
          <img src={pinkStars} alt={preHeadline} /> {preHeadline}
        </h4>
        <h2 className="section-h2 cta-h2">{headline}</h2>
        <br />
        <p className="section-p cta-p">{subheadline}</p>
        <div className="mobile-only">
          {isButton ? (
            <Button
              //    className=" "
              //    id="downloadAppLink"
              // func={gtagEvent('RASO_CLICKED_DOWNLOADAPP')}
              func={action}
              text={mobileActionElementText}
            />
          ) : (
            <Link
              href={mobileActionElementLink}
              func={action}
              text={mobileActionElementText}
              // className="dlAccountableLink rasoFunnel"
              // id="downloadAppLink"
              // func={gtagEvent('RASO_CLICKED_DOWNLOADAPP')}
            />
          )}
        </div>
        <div className="desktop-only">
          {isButton ? (
            <Button
              //    className=" "
              //    id="downloadAppLink"
              // func={gtagEvent('RASO_CLICKED_DOWNLOADAPP')}
              func={action}
              text={desktopActionElementText}
            />
          ) : (
            <Link
              href={desktopActionElementLink}
              func={action}
              text={desktopActionElementText}
              // className="dlAccountableLink rasoFunnel"
              // id="downloadAppLink"
              // func={gtagEvent('RASO_CLICKED_DOWNLOADAPP')}
            />
          )}
        </div>
        <Terms offerPromises={offerPromises} />
      </div>
    </section>
  );
};

export default CTA;
