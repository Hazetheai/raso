import clsx from "clsx";
import React from "react";
import "./toast.css";
const Toast = ({ text, active }) => {
  return (
    <div
      className={clsx("element-container", "toast", active && "toast--active")}
    >
      <span className="toast__text-wrapper">
        {" "}
        <>{text}</>
      </span>
      <div className="loading-indicator">
        <div className="lds-ellipsis" id="autosaving">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Toast;
