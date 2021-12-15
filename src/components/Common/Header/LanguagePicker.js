import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";
import "./language-picker.css";
const LanguagePicker = () => {
  const { t, i18n } = useTranslation();
  let history = useHistory();
  const { search } = useLocation();

  return (
    <div className="language-picker-active">
      {i18n.language.toUpperCase()}
      <div className="language-picker-all">
        <Link
          onClick={() => {
            i18n.changeLanguage(i18n.language === "de" ? "en" : "de");
            // if(i18n.language === "de")
            // {window.history.pushState({}, '', window.location.href.replace(/\/en/,""));}
            // history.push(
            //   i18n.language === "de" ? "/" + search : "/en" + search
            // );
          }}
          to={i18n.language === "en" ? "/" + search : "/en" + search}
        >
          {i18n.language === "de" ? "English" : "Deutsch"}{" "}
        </Link>{" "}
        {i18n.language === "de" ? "Deutsch" : "English"}{" "}
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
