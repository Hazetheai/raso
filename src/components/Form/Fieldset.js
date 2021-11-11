import clsx from "clsx";
import React from "react";

const Fieldset = ({ children, subfield, title, helper }) => {
  return (
    <fieldset className={clsx("fieldset", subfield && "subfield")}>
      {title && <h4>{title}</h4>}
      {helper && <p className="fieldset_helper body--small">{helper}</p>}
      {children}
    </fieldset>
  );
};

export default Fieldset;
