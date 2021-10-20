import React, { Fragment, useState } from "react";
import "./field.css";
import clsx from "clsx";
import { useController } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { country } from "../../settings/config";
import { BEVATCheckDigit } from "../Form/validators";
import fieldHelperIcon from "./helper-icon.svg";
const Field = React.forwardRef(
  (
    {
      type,
      name,
      label,
      topLabel,
      fieldHelperText,
      fieldHelperExpand,
      expandedHelperTitle,
      expandedHelperContent,
      onToggleHelper,
      errors,
      options,
      control,
      disabled,
      onBlur,
      value,
      autoComplete,
      autoFocus,
      watch,
      shorter,
    },
    ref
  ) => {
    const { t } = useTranslation();
    const notEmptyValue = watch ? watch(name) : false;
    return (
      <div className="field">
        <div className="field_helper-row">
          {topLabel && <label className="field_top-label">{topLabel}</label>}
          {fieldHelperExpand && (
            <span
              role="button"
              title=""
              onClick={() => (onToggleHelper ? onToggleHelper() : null)}
              className="field_helper-icon"
            >
              <img src={fieldHelperIcon} alt={"More Info"} />
            </span>
          )}
        </div>

        {fieldHelperText && (
          <span className="field_helper-text">{fieldHelperText}</span>
        )}
        {type === "picker" ? (
          <Fragment>
            <label className="field_label">{label}</label>
            <Picker
              name={name}
              options={options}
              control={control}
              disabled={disabled}
            />
          </Fragment>
        ) : (
          <div className="magicfield">
            {type === "phone" ? (
              <PhoneInput
                name={name}
                shorter={shorter}
                control={control}
                errors={errors}
              />
            ) : type === "VATNumber" ? (
              <VATNumberInput name={name} control={control} errors={errors} />
            ) : type === "select" ? (
              <select
                name={name}
                ref={ref}
                className={clsx(
                  "field_input",
                  "field_input--select",
                  errors[name] && "field_input--error"
                )}
              >
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={type}
                name={name}
                className={clsx(
                  "field_input",
                  errors[name] && "field_input--error"
                )}
                ref={ref}
                onBlur={onBlur}
                disabled={disabled}
                defaultValue={value}
                autoComplete={autoComplete}
                autoFocus={autoFocus}
                id={name}
              />
            )}
            <label
              htmlFor={name}
              className={clsx(
                "magicfield_label",
                (notEmptyValue ||
                  type === "phone" ||
                  type === "VATNumber" ||
                  (disabled && value)) &&
                  "magicfield_label--filled"
              )}
            >
              {label}
            </label>
          </div>
        )}
        <span className="field_error">
          {errors[name] && (
            <span>
              {errors[name].type === "required" && t("field_required")}
              {(errors[name].type === "pattern" ||
                errors[name].type === "minLength" ||
                errors[name].type === "maxLength") &&
                t("field_invalid")}
              {errors[name].type === "validate" &&
                name === "email" &&
                t("email_exists")}
              {errors[name].type === "validate" &&
                name === "VATNumber" &&
                t("field_invalid")}
            </span>
          )}
        </span>
      </div>
    );
  }
);

const Picker = ({ options, name, control, disabled }) => {
  const {
    field: { value, onChange, ref },
  } = useController({
    name,
    control,
    rules: { required: true },
    defaultValue: "",
  });
  return (
    <div className="select">
      {options.map((option) => (
        <span
          key={option.value}
          className={clsx(
            "select_option",
            value === option.value && "select_option--selected"
          )}
          onClick={() => !disabled && onChange(option.value)}
        >
          {option.name}
        </span>
      ))}
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
    defaultValue: country === "de" ? "+49 " : "+32 ",
  });
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
      onBlur={onBlur}
    />
  );
};

const VATNumberInput = ({ name, control, errors }) => {
  const {
    field: { value, onChange, onBlur, ref },
  } = useController({
    name,
    control,
    rules: {
      pattern: /^BE ([0-1])(\d{3})\.(\d{3})\.(\d{3})$/i,
      validate: BEVATCheckDigit,
    },
    defaultValue: "BE ",
  });
  const formatVAT = (e) => {
    let vat = e.target.value.toUpperCase().replace(/\+|[^\d]/g, "");
    onChange(
      value.length <= e.target.value.length
        ? "BE " +
            vat
              .split("")
              .map(function (char, index) {
                if (index === 4 || index === 7 || index === 10) {
                  char = "." + char;
                }
                if (index > 9) char = "";
                return char;
              })
              .join("")
        : e.target.value
    );
  };
  return (
    <input
      type="text"
      name={name}
      className={clsx("field_input", errors[name] && "field_input--error")}
      value={value}
      onChange={formatVAT}
      onBlur={onBlur}
    />
  );
};

const FormField = ({ ...fieldProps }) => {
  const [isHelperVisible, setIsHelperVisible] = useState(false);

  function toggleHelper() {
    setIsHelperVisible(!isHelperVisible);
  }

  return (
    <div
      className={`form-question ${
        fieldProps.fieldHelperExpand ? "full-width" : ""
      }`}
    >
      <Field {...fieldProps} onToggleHelper={toggleHelper} />

      {isHelperVisible && (
        <FieldHelper
          isActive={isHelperVisible}
          title={fieldProps.expandedHelperTitle}
          content={fieldProps.expandedHelperContent}
        />
      )}
    </div>
  );
};

const FieldHelper = ({ title, content, isActive }) => {
  return (
    <div className={`field_helper ${isActive ? "active" : ""}`}>
      {title && <h5 className="field_helper__title">{title}</h5>}
      {content && (
        <p
          className="field_helper__content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
    </div>
  );
};

export default FormField;
