import React from "react";
import "./link.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";

const Link = React.forwardRef(
  (
    {
      children,
      href,
      text,
      title,
      func,
      className,
      secondary,
      inline,
      ...rest
    },
    ref
  ) => {
    return (
      <a
        {...rest}
        ref={ref}
        href={href}
        title={title}
        className={clsx(
          "link",
          className,
          secondary && "link--sencondary",
          inline && "link--inline"
        )}
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
  }
);

export default Link;
