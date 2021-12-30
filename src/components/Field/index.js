import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cleave from "cleave.js/react";
import clsx from "clsx";
import Button from "components/Button";
import { moneyRegex } from "components/Form/validators";
import { useKeyPress } from "hooks/useKeyPress";
import React, { Fragment, useEffect, useState } from "react";
import { useController } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { gtagEvent } from "res/gtag";
import { useUserInteraction } from "data-layer/userInteraction";
import "./field.css";
import fieldHelperIcon from "./helper-icon.svg";

const Field = React.forwardRef(
  (
    {
      type,
      name,
      floatingLabel,
      topLabel,
      fieldHelperText,
      secondFieldHelperText,
      helperBelow,
      halfWidth,
      expandedHelpers,
      inputMode,
      errors,
      options,
      control,
      disabled,
      onBlur = () => {
        gtagEvent("RASO_FILLFIELD-ITER-1", { field: name });
      },
      value,
      autoComplete,
      autoFocus,
      watch,
      shorter,
      maxChars,
      pickerRules,
      moneyRules,
      dateMinMax,
    },
    ref
  ) => {
    const { t } = useTranslation();
    const { userInteraction, setUserInteraction } = useUserInteraction();

    const isEscapePressed = useKeyPress("Escape");

    const fieldValue = watch ? watch(name) : null;

    useEffect(() => {
      if (isEscapePressed) {
        setUserInteraction({ helperId: "" });
      }
    }, [isEscapePressed, setUserInteraction]);

    return (
      <div
        className={clsx(
          "form-question",
          halfWidth ? "half-width" : "",
          !!expandedHelpers?.length ? "has-helper" : ""
        )}
        id={name}
      >
        <div className="field">
          <div className="field_helper-row">
            {topLabel && <label className="field_top-label">{topLabel}</label>}
            {!!expandedHelpers?.length && (
              <span
                role="button"
                title={t("more_info")}
                onClick={() => {
                  userInteraction.helperId === name
                    ? setUserInteraction({ helperId: "" })
                    : setUserInteraction({ helperId: name });

                  gtagEvent("RASO_CLICKED_HELPER-ITER-1", { helper: name });
                }}
                className="field_helper-icon"
              >
                <img src={fieldHelperIcon} alt={t("more_info")} />
              </span>
            )}
          </div>

          {fieldHelperText && !helperBelow && (
            <span
              className="body--small field_helper-text--top"
              dangerouslySetInnerHTML={{ __html: fieldHelperText }}
            />
          )}
          {type === "picker" ? (
            <Fragment>
              {!topLabel && (
                <label className="field_label">{floatingLabel}</label>
              )}
              <Picker
                rules={pickerRules}
                name={name}
                options={options}
                control={control}
                disabled={disabled}
              />
            </Fragment>
          ) : type === "checkbox" ? (
            <Checkbox
              name={name}
              option={options.length ? options[0] : options}
              control={control}
              disabled={disabled}
            />
          ) : (
            <div
              className={clsx(
                "magicfield",
                type === "jump-date" && "jump-date"
              )}
            >
              {type === "phone" ? (
                <PhoneInput
                  name={name}
                  shorter={shorter}
                  control={control}
                  errors={errors}
                />
              ) : type === "select" ? (
                <select
                  name={name}
                  ref={ref}
                  defaultValue={options[0]}
                  onBlur={() => {
                    gtagEvent("RASO_FILLFIELD-ITER-1", { field: name });
                    setUserInteraction({ helperId: "" });
                  }}
                  onFocus={() => {
                    userInteraction.helperId === name
                      ? setUserInteraction({ helperId: "" })
                      : setUserInteraction({ helperId: name });
                  }}
                  className={clsx(
                    "field_input",
                    "field_input--select",
                    errors[name] && "field_input--error"
                  )}
                >
                  {options.map((option) => (
                    <option
                      key={option.value || option.name}
                      disabled={
                        option.value === "choose" ||
                        option.disabled ||
                        option.value === null
                      }
                      value={option.value}
                    >
                      {option.name}
                    </option>
                  ))}
                </select>
              ) : type === "textarea" ? (
                <textarea
                  type={type}
                  name={name}
                  className={clsx(
                    "field_input",
                    errors[name] && "field_input--error"
                  )}
                  rows={7}
                  ref={ref}
                  onBlur={() => {
                    setUserInteraction({ helperId: "" });
                    onBlur && onBlur();
                  }}
                  disabled={disabled}
                  defaultValue={value}
                  autoComplete={autoComplete}
                  autoFocus={autoFocus}
                  id={name}
                  maxLength={maxChars}
                  onFocus={() => {
                    userInteraction.helperId === name
                      ? setUserInteraction({ helperId: "" })
                      : setUserInteraction({ helperId: name });
                  }}
                />
              ) : type === "jump-date" ? (
                <JumpDate
                  name={name}
                  control={control}
                  errors={errors}
                  shorter={shorter}
                  minMax={dateMinMax}
                />
              ) : type === "money" ? (
                <Money
                  type="number"
                  name={name}
                  control={control}
                  errors={errors}
                  shorter={shorter}
                  rules={moneyRules}
                />
              ) : (
                <input
                  type={type}
                  inputMode={inputMode}
                  name={name}
                  className={clsx(
                    "field_input",
                    errors[name] && "field_input--error"
                  )}
                  ref={ref}
                  onBlur={() => {
                    setUserInteraction({ helperId: "" });
                    onBlur && onBlur();
                  }}
                  disabled={disabled}
                  defaultValue={value}
                  autoComplete={autoComplete}
                  autoFocus={autoFocus}
                  id={name}
                  maxLength={maxChars}
                  onFocus={() => {
                    userInteraction.helperId === name
                      ? setUserInteraction({ helperId: "" })
                      : setUserInteraction({ helperId: name });
                  }}
                />
              )}
              {floatingLabel && (
                <label
                  htmlFor={name}
                  className={clsx(
                    "magicfield_label",
                    (fieldValue || type === "phone" || (disabled && value)) &&
                      "magicfield_label--filled"
                  )}
                >
                  {floatingLabel}
                </label>
              )}
            </div>
          )}

          {fieldHelperText && helperBelow && (
            <span
              className="body--small field_helper-text--bottom"
              dangerouslySetInnerHTML={{ __html: fieldHelperText }}
            />
          )}
          {secondFieldHelperText && (
            <span
              className="body--small field_helper-text--bottom"
              dangerouslySetInnerHTML={{ __html: secondFieldHelperText }}
            />
          )}
          {maxChars && (
            <MaxChars numChars={fieldValue?.length || 0} maxChars={maxChars} />
          )}
          <span className="field_error">
            {errors[name] && (
              <span>
                {errors[name].type === "required" && t("field_required")}
                {(errors[name].type === "pattern" ||
                  errors[name].type === "minLength" ||
                  errors[name].type === "maxLength") &&
                  t("field_invalid")}
                {errors[name].type === "manual" && errors[name].message}
                {errors[name].type === "validate" &&
                  name === "email" &&
                  t("email_exists")}
                {errors[name].type === "validate" && t(errors[name]?.message)}
              </span>
            )}
          </span>
        </div>

        {userInteraction.helperId === name && !!expandedHelpers?.length && (
          <FieldHelper
            name={name}
            isActive={userInteraction.helperId === name}
            expandedHelpers={expandedHelpers}
            // toggleHelper={toggleHelper}
          />
        )}
      </div>
    );
  }
);

const Picker = ({
  options,
  name,
  control,
  disabled,
  rules,
  defaultValue = "",
}) => {
  const {
    field: { value, onChange, ref },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
  });
  return (
    <div className="select" id={name}>
      {options.map((option) => (
        <React.Fragment key={option.value}>
          <span
            className={clsx(
              "select_option",
              value === option.value && "select_option--selected"
            )}
            onClick={() => {
              gtagEvent("RASO_FILL_FIELD-ITER-1", { field: name });
              return !disabled && onChange(option.value);
            }}
            name={option.value}
          ></span>
          <span
            className="select_option-name"
            onClick={() => {
              gtagEvent("RASO_FILL_FIELD-ITER-1", { field: name });
              return !disabled && onChange(option.value);
            }}
          >
            {option.name}
          </span>
        </React.Fragment>
      ))}
    </div>
  );
};
const Checkbox = ({ option, name, control, disabled, defaultValue = "" }) => {
  const {
    field: { value, onChange, onBlur, ref },
  } = useController({
    name,
    control,
    rules: { required: option.required === true },
    defaultValue,
  });
  return (
    <div className="checkbox">
      <div
        className="checkbox-choice"
        key={option.name}
        onClick={() => {
          gtagEvent("RASO_FILLFIELD-ITER-1", {
            field: name,
            value: option.value,
          });
        }}
      >
        <span
          className={clsx(
            "checkbox_option",
            value === option.value && "checkbox_option--checked"
          )}
          onClick={() =>
            !disabled && onChange(value === option.value ? false : option.value)
          }
        >
          {value === option.value && <FontAwesomeIcon icon={faCheck} />}
        </span>
        <span
          className="checkbox_option-name body--medium"
          onClick={() =>
            !disabled && onChange(value === option.value ? false : option.value)
          }
        >
          {option.name}
        </span>
      </div>
    </div>
  );
};

const PhoneInput = ({ name, control, errors, shorter }) => {
  const {
    field: { value, onChange, onBlur, ref },
  } = useController({
    name,
    control,
    rules: { required: true, minLength: 12 },
    defaultValue: "+49 ",
  });
  const { userInteraction, setUserInteraction } = useUserInteraction();

  const formatPhone = (e) => {
    let phone = e.target.value.replace(/\+|[^\d]/g, "");
    onChange(
      "+" +
        phone
          .split("")
          .map(function (char, index) {
            if (
              index === 2 ||
              index === 5 ||
              index === 7 ||
              index === 9 ||
              index === 11
            ) {
              char = " " + char;
            }
            if (index > 12) char = "";
            return char;
          })
          .join("")
    );
  };
  return (
    <input
      type="text"
      name={name}
      className={clsx(
        "field_input",
        shorter && "field_input--shorter",
        errors[name] && "field_input--error"
      )}
      value={value}
      onChange={formatPhone}
      onBlur={() => {
        gtagEvent("RASO_FILLFIELD-ITER-1", { field: name });
        setUserInteraction({ helperId: "" });
        return onBlur();
      }}
      onFocus={() => {
        setUserInteraction({ helperId: name });
      }}
    />
  );
};

const JumpDate = ({ name, control, errors, shorter, minMax = {} }) => {
  const {
    field: { ref, ...inputProps },
    meta: { invalid, isTouched, isDirty },
  } = useController({
    name,
    control,
    rules: { required: true, minLength: 10 },
    defaultValue: "",
  });
  const { userInteraction, setUserInteraction } = useUserInteraction();

  return (
    <Cleave
      className={clsx(
        "field_input",
        shorter && "field_input--shorter",
        inputProps.value && "field_input--control-value",
        (errors[name] ||
          (inputProps.value?.length > 0 && inputProps.value?.length < 10)) &&
          "field_input--error"
      )}
      name={name}
      ref={ref}
      {...inputProps}
      onBlur={() => {
        gtagEvent("RASO_FILLFIELD-ITER-1", { field: name });
        setUserInteraction({ helperId: "" });
        return inputProps.onBlur();
      }}
      onFocus={() => {
        setUserInteraction({ helperId: name });
      }}
      options={{
        date: true,
        datePattern: ["d", "m", "Y"],
        delimiter: ".",
        ...minMax,
      }}
    />
  );
};

const Money = ({ name, control, rules }) => {
  const {
    field: { value, onChange, onBlur, ref },
  } = useController({
    name,
    control,
    rules: {
      required: true,
      pattern: moneyRegex,
      minLength: 3,
      ...rules,
    },
  });
  const { i18n } = useTranslation();
  const { userInteraction, setUserInteraction } = useUserInteraction();

  const isDe = i18n.language === "de";

  return (
    <Cleave
      className="field_input"
      ref={ref}
      value={value}
      onChange={onChange}
      onBlur={() => {
        gtagEvent("RASO_FILLFIELD-ITER-1", { field: name });
        setUserInteraction({ helperId: "" });

        return onBlur();
      }}
      onFocus={(e) => {
        if (e.target.value?.length > 2 && isDe) {
          const end = e.target.value.length - 2;
          const start = end - 1;
          e.target.setSelectionRange(start, end);
        }
        setUserInteraction({ helperId: name });
      }}
      options={{
        numeral: true,
        numericOnly: true,
        numeralThousandsGroupStyle: "thousand",
        numeralDecimalMark: isDe ? "," : ".",
        delimiter: isDe ? "." : ",",
        numeralPositiveOnly: true,
        noImmediatePrefix: true,
        prefix: isDe ? " €" : "€ ",
        tailPrefix: isDe,
      }}
    />
  );
};

const FieldHelper = ({ expandedHelpers, isActive, name }) => {
  const { t } = useTranslation();
  const { userInteraction, setUserInteraction } = useUserInteraction();
  const [activeAnimation, setActiveAnimation] = useState(false);

  useEffect(() => {
    if (isActive) {
      setActiveAnimation(isActive);
    }
  }, [isActive]);

  if (!expandedHelpers?.length) {
    return null;
  }

  return (
    <div
      className={clsx(
        "field_helper",
        "element-container",
        activeAnimation && "active"
      )}
    >
      <div className="field_helper__top-bar">
        <FontAwesomeIcon
          className="icon"
          icon={faTimes}
          onClick={() => setUserInteraction({ helperId: "" })}
        />
      </div>

      {expandedHelpers?.map((helper, idx, arr) => (
        <React.Fragment key={helper.title}>
          {helper.title && (
            <h5 className="field_helper__title">💡 {helper.title}</h5>
          )}
          {helper.content && (
            <>
              <p
                className="field_helper__content"
                dangerouslySetInnerHTML={{ __html: helper.content }}
              />

              {helper.intercom && (
                <Button
                  type="button"
                  func={() => window.Intercom && window.Intercom("show")}
                  text={t("any_questions")}
                  inline
                />
              )}
            </>
          )}
          {idx < arr.length - 1 ? <hr /> : null}
        </React.Fragment>
      ))}
    </div>
  );
};

const MaxChars = ({ numChars, maxChars }) => {
  const { t } = useTranslation();
  return (
    <div>
      <span
        className="field_helper-maxChars-level"
        style={
          numChars < 1
            ? {}
            : numChars > 0
            ? {
                "--gradient-char-limit": `linear-gradient(
                  90deg,
                  var(--color-primary) ${
                    numChars < maxChars ? (numChars / maxChars) * 100 - 6 : 100
                  }%,
                  var(--color-primary) ${
                    numChars < maxChars ? (numChars / maxChars) * 100 - 9 : 100
                  }%,
                  var(--color-primary) ${
                    numChars < maxChars ? (numChars / maxChars) * 100 - 13 : 100
                  }%,
                  #fff ${(numChars / maxChars) * 100}%,
                  rgba(163, 58, 177, 0) ${(numChars / maxChars) * 100}%
                )`,
              }
            : {}
        }
      />
      <span className="field_helper-maxChars body--small">
        {t("maximum")}{" "}
        <strong
          style={
            numChars > maxChars - 10
              ? {
                  color: "var(--color-invalid_red)",
                }
              : {}
          }
        >
          {numChars || 0} / {maxChars}{" "}
        </strong>{" "}
        {t("characters")}
      </span>
    </div>
  );
};

export default Field;
