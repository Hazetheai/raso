import React from "react";
import "./link.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Link = ({ children, href, text, title, func, className, ...rest }) => {
  return (
    <a
      {...rest}
      href={href}
      title={title}
      className={`link ${className || ""}`}
      onClick={func}
      onKeyDown={(e) => {
        if (
          e.key === "Enter" ||
          e.code === "Enter" ||
          e.key === " " ||
          e.code === "Space"
        ) {
          func && func(e);
        }
      }}
    >
      {children || text}{" "}
      <FontAwesomeIcon className="faq-icon" icon={faArrowRight} />
    </a>
  );
};

export default Link;
