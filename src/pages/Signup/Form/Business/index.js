import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { sendAmplitudeData } from "../../../../res/amplitude";
import DEForm from "./DEForm";

const Business = ({
  nextStep,
  disabled,
  error,
  businessInfoList,
  formData,
}) => {
  const { handleSubmit, watch, register, errors, control } = useForm({
    mode: "onBlur",
  });
  const [businessInfo, setBusinessInfo] = useState();
  const [showBusinessMatch, setShowBusinessMatch] = useState(true);
  const onSubmit = (data) =>
    nextStep({ ...data, ...businessInfo }, "businessFields");
  const { t } = useTranslation();
  useEffect(() => {
    sendAmplitudeData("WEB_SIGNUP_TABVIEW", {
      tab: "business",
    });
  }, []);
  return (
    <form
      className="form"
      id="submitFormWebSignup"
      onSubmit={handleSubmit(onSubmit)}
    >
      <DEForm
        disabled={disabled}
        watch={watch}
        register={register}
        errors={errors}
        control={control}
      />{" "}
      :
      {(businessInfo ||
        businessInfoList.length === 0 ||
        !showBusinessMatch) && (
        <div className="form_submit">
          <button className="form_submit_btn" disabled={disabled}>
            {t("form_create_account")}
          </button>
        </div>
      )}
      {error && <span className="form_error">{t("form_error")}</span>}
    </form>
  );
};
export default Business;
