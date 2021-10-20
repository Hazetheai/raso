import React, { Fragment, useEffect } from "react";
import Field from "../../Field";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { sendAmplitudeData } from "../../../res/amplitude";
import { emailValidator } from "../validators";
import Button from "../../Button";
import Modal from "components/Modal";
import FAQ from "components/FAQ";
import CTA, { CTAsampleData } from "components/CTA";

const Personal = ({ nextStep }) => {
  const { register, handleSubmit, watch, errors, control } = useForm({
    mode: "onBlur",
  });
  const onSubmit = (data) => nextStep(data, "personalFields");
  const accountType = watch("accountType");
  const { t } = useTranslation();
  useEffect(() => {
    setTimeout(() => {
      sendAmplitudeData("WEB_SIGNUP_TABVIEW", {
        tab: "personal",
      });
    }, 500);
  }, []);
  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <Field
        type="text"
        name="fullName"
        label={t("full_name_label")}
        placeholder={t("full_name_placeholder")}
        ref={register({
          required: true,
          maxLength: 80,
        })}
        autoFocus={true}
        errors={errors}
        watch={watch}
        topLabel="Vorname"
        fieldHelperText="This is for your name. Your Vorname"
        fieldHelperExpand
        expandedHelperTitle={"Start deiner Selbständigkeit"}
        expandedHelperContent={`Du kannst deine Selbständigkeit auch rückwirkend anmelden. Gerade, wenn du schon Kosten zum Anschieben deiner Selbständigkeit hast, kann das Sinn machen. Beachte aber, dass dann evtl. Steuermeldungen nachzuholen sind.`}
      />
      <Field
        type="phone"
        name="phoneNumber"
        label={t("phone_label")}
        errors={errors}
        control={control}
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
        // value={email}
        autoFocus={true}
        errors={errors}
        watch={watch}
      />
      {/* <Field
        type="password"
        name="password"
        label={t("password_label")}
        placeholder={t("password_placeholder")}
        ref={register({
          required: true,
          minLength: 6,
          maxLength: 80,
        })}
        autoComplete="new-password"
        errors={errors}
        watch={watch}
      /> */}

      <div className="form_submit">
        <Button text={t("form_continue")} />
      </div>
    </form>
  );
};
export default Personal;
