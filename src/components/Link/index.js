import React from "react";
import "./link.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import { Link as RRLink } from "react-router-dom";

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
          "body--big-bold",
          className,
          secondary && "link--secondary",
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

export const ExternalLink = Link;
export const InternalLink = (props) => (
  <RRLink {...props} component={<Link {...props} />} />
);
