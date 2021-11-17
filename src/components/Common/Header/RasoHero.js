import clsx from "clsx";
import Badges from "components/Badges";
import Button from "components/Button";
import Link from "components/Link";
import Terms from "components/Terms";
import React from "react";
import { useTranslation } from "react-i18next";

import { useUserInteraction } from "userInteraction";
import "./hero.css";

const RasoHero = ({ terms, h1, h3, ctaText, ctaLink, ctaFunc }) => {
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
    </>
  );
};

export default RasoHero;