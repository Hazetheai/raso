import React from "react";
import "./terms.css";

const Terms = ({ offerPromises, vertical }) => {
  return (
    <div
      className={`terms-footnote flex-container ${
        vertical ? "flex-column" : ""
      }`}
    >
      {offerPromises.map((promise) => {
        return (
          <p key={promise.text}>
            <span className="promise-icon">
              <img src={promise.imgSrc} alt={promise.text} />
            </span>
            {promise.text}
          </p>
        );
      })}
    </div>
  );
};

export default Terms;
