import React from "react";
import "./language-picker.css";
const LanguagePicker = () => {
  return (
    <div className="language-picker-active">
      de{" "}
      <div className="language-picker-all">
        {/* TODO */}
        <a href="https://www.accountable.de/en/online-tax-registration/">
          English
        </a>{" "}
        Deutsch{" "}
      </div>
      <svg
        width="10"
        height="6"
        viewBox="0 0 10 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="language-picker-activearrow"
      >
        <path
          d="M1 1L5 5L9 1"
          stroke="#6D4AD3"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </svg>
    </div>
  );
};

export default LanguagePicker;
