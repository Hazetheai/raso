import React, { useEffect, useRef, useState } from "react";
import Field from "../../../../components/Field";
import { useForm } from "react-hook-form";
import { emailValidator } from "../validators";
import { useTranslation } from "react-i18next";
import { sendAmplitudeData } from "../../../../res/amplitude";
import { useLocation } from "react-router-dom";
import qs from "querystring";

const Start = ({ nextStep }) => {
  const [email, setEmail] = useState("");
  const location = useLocation();
  const nextStepRef = useRef();
  const { register, handleSubmit, watch, errors } = useForm({
    mode: "onBlur",
  });
  const onSubmit = (data) => nextStep(data);
  const { t } = useTranslation();
  useEffect(() => {
    setTimeout(() => {
      sendAmplitudeData("WEB_SIGNUP_TABVIEW", {
        tab: "start",
      });
    }, 500);

    const usable =
      location.search[0] === "?" ? location.search.slice(1) : location.search;
    const params = qs.parse(usable);
    if (params.email) {
      setEmail(params.email);
    }
  }, []);
  useEffect(() => {
    if (email) nextStepRef.current.click();
  }, [email]);
  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <Field
        type="text"
        name="firstName"
        label={t("first_name_label")}
        placeholder={t("first_name_placeholder")}
        ref={register({
          required: true,
          // validate: emailValidator,
          // pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        })}
        // onBlur={() =>
        //   sendAmplitudeData("WEB_SIGNUP_FILLFIELD", {
        //     field: "firstName",
        //   })
        // }
        value={email}
        autoFocus={true}
        errors={errors}
        watch={watch}
      />
      <Field
        type="lastName"
        name="lastName"
        label={t("last_name_label")}
        placeholder={t("last_name_placeholder")}
        ref={register({
          required: true,
          // validate: emailValidator,
          // pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        })}
        // onBlur={() =>
        //   sendAmplitudeData("WEB_SIGNUP_FILLFIELD", {
        //     field: "email",
        //   })
        // }
        value={email}
        autoFocus={true}
        errors={errors}
        watch={watch}
      />
      <Field
        type="email"
        name="email"
        label={t("email_address_label")}
        placeholder={t("email_address_placeholder")}
        ref={register({
          required: true,
          validate: emailValidator,
          pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        })}
        onBlur={() =>
          sendAmplitudeData("WEB_SIGNUP_FILLFIELD", {
            field: "email",
          })
        }
        value={email}
        autoFocus={true}
        errors={errors}
        watch={watch}
      />
      <Field
        type="email"
        name="email"
        label={t("email_address_label")}
        placeholder={t("email_address_placeholder")}
        ref={register({
          required: true,
          validate: emailValidator,
          pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        })}
        onBlur={() =>
          sendAmplitudeData("WEB_SIGNUP_FILLFIELD", {
            field: "email",
          })
        }
        value={email}
        autoFocus={true}
        errors={errors}
        watch={watch}
      />
      <div className="form_submit">
        <button className="form_submit_btn" ref={nextStepRef}>
          {t("form_continue")}
        </button>
      </div>
      <span className="form_consent">{t("consent_message")}</span>
    </form>
  );
};
export default Start;
