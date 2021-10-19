import React from "react";
import rasoCTAImage from "res/images/raso-cta-2-illustration.png";
import pinkStars from "res/images/pink_stars.svg";
import checkmark from "res/images/checkmark.svg";
import Link from "components/Link";
import Button from "components/Button";
import "./cta.css";
import Terms from "components/Terms";

export const CTAsampleData = {
  preHeadline: "SPECIAL OFFER FOR BEGINNERS",
  mainImageSrc: rasoCTAImage,
  headline: "Get 6 months free of Accountable PRO",
  subheadline:
    "We offer our best subscription free of charge for all those who obtain their tax number through us.",
  mobileActionElementText: "START FOR FREE",
  mobileActionelementLink: "https://accountable.app.link/FTshY7oGF3?",
  desktopActionelementText: "START FOR FREE",
  desktopActionelementLink: "http://onboarding.accountable.de/en/",
  isButton: false,
  action: () => console.log("Click CTA"),
  offerPromises: [
    { imgSrc: checkmark, text: "No Credit Card Required" },
    { imgSrc: checkmark, text: "Full Beginner Support" },
  ],
};

const CTA = ({
  preHeadline,
  mainImageSrc,
  headline,
  subheadline,
  mobileActionelementLink,
  mobileActionElementText,
  desktopActionelementLink,
  desktopActionelementText,
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
              href={mobileActionelementLink}
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
              text={desktopActionelementText}
            />
          ) : (
            <Link
              href={desktopActionelementLink}
              func={action}
              text={desktopActionelementText}
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
