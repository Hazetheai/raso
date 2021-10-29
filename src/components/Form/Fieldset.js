import clsx from "clsx";
import React from "react";

const Fieldset = ({ children, subfield, title }) => {
  return (
    <fieldset className={clsx("fieldset", subfield && "subfield")}>
      {title && <h4>{title}</h4>}
      {children}
    </fieldset>
  );
};

export default Fieldset;
