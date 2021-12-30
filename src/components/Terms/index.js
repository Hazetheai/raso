import clsx from "clsx";
import React from "react";
import { useTranslation } from "react-i18next";
import "./terms.css";

const Terms = ({ offerPromises, vertical }) => {
  const { t } = useTranslation();

  return (
    <div
      className={clsx(
        "terms-footnote",
        "flex-container",
        vertical && "flex-column"
      )}
    >
      {offerPromises.map((promise) => {
        return (
          <p key={t(promise.text)}>
            <span className="promise-icon">
              <img src={promise.imgSrc} alt={t(promise.text)} />
            </span>
            {t(promise.text)}
          </p>
        );
      })}
    </div>
  );
};

export default Terms;
