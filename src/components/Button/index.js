import clsx from "clsx";
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
  inline,
  isLoading,
  ...rest
}) => {
  return (
    <button
      {...rest}
      className={clsx(
        "body--big-bold",
        className,
        clear && "form_submit_btn--clear",
        fluid && "form_submit_btn--fluid",
        inline && "form_submit_btn--inline",
        "form_submit_btn"
      )}
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
      {isLoading ? (
        <div className="button--loading-indicator">
          <div className="lds-ellipsis" id="estirevLoading">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        children || text
      )}
    </button>
  );
};

export default Button;
