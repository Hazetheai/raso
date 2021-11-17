import React from "react";
import "./hero.css";
import RasoHero from "./RasoHero";
import SuccessHero from "./SuccessHero";

// { terms, h1, h3, ctaText, ctaLink, ctaFunc }
const Hero = (props) => {
  return (
    <>
      {props.isSuccessPage ? (
        <SuccessHero {...props} />
      ) : (
        <RasoHero {...props} />
      )}
    </>
  );
};

export default Hero;
