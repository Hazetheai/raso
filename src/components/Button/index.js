import React from "react";
import "./button.css";

const Button = ({
  children,
  text,
  disabled,
  func,
  className,
  clear,
  fluid,
  ...rest
}) => {
  return (
    <button
      {...rest}
      className={`form_submit_btn ${className || ""} ${clear ? "clear" : ""} ${
        fluid ? "fluid" : ""
      }`}
      disabled={disabled}
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
      {children || text}
    </button>
  );
};

export default Button;
