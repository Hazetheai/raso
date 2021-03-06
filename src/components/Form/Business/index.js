import Button from "components/Button";
import FormField from "components/Field";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { isEmpty } from "res/lib";
import Fieldset from "../Fieldset";
import { validators } from "../validators";

const Business = ({
  steps,
  currentStep,
  nextStep,
  defaultValues,
  comingStep,
}) => {
  const { handleSubmit, watch, register, errors, control, reset } = useForm({
    mode: "onBlur",
  });

  const onSubmit = (data) => nextStep(data, "businessFields");
  const officeaddress_value = watch("officeaddress");
  const { t } = useTranslation();

  useEffect(() => {
    reset(defaultValues); // asynchronously reset your form values
  }, []);

  // useEffect(() => {
  //   sendAmplitudeData("WEB_SIGNUP_TABVIEW", {
  //     tab: "business",
  //   });
  // }, []);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form">
        <FormField
          type="textarea"
          name="profession"
          topLabel={t("profession_label")}
          fieldHelperText={t("profession_helper", {
            link: '<a href="http://accountable.de/blog/freiberufler-oder-gewerbe/" target="_blank">Hier findest du mehr Informationen dazu.</>',
          })}
          expandedHelpers={[
            {
              title: t("profession_helper_expand_title"),
              content: t("profession_helper_expand_content"),
            },
          ]}
          ref={register({
            required: true,
            maxLength: 200,
            pattern: validators.profession,
          })}
          errors={errors}
          watch={watch}
          autoFocus
          maxChars={200}
        />

        <FormField
          type="picker"
          control={control}
          name="officeaddress"
          fullWidth
          topLabel={t("officeaddress_label")}
          options={[
            { name: t("yes"), value: "yes" },
            { name: t("no"), value: "no" },
          ]}
          errors={errors}
        />

        {officeaddress_value === "yes" && (
          <Fieldset subfield>
            <FormField
              type="text"
              ref={register({
                required: true,
                pattern: validators.office_address_street,
              })}
              name="office_address_street"
              floatingLabel={t("address_street")}
              errors={errors}
              control={control}
              watch={watch}
              topLabel={t("address_label")}
            />
            <FormField
              type="text"
              ref={register({
                required: true,
                pattern: validators.office_address_number,
              })}
              name="office_address_number"
              floatingLabel={t("address_number")}
              errors={errors}
              control={control}
              watch={watch}
            />
            <FormField
              type="text"
              ref={register({
                required: true,
                pattern: validators.office_address_city,
              })}
              name="office_address_city"
              floatingLabel={t("address_city")}
              errors={errors}
              control={control}
              watch={watch}
            />
            <FormField
              type="text"
              ref={register({
                required: true,
                pattern: validators.office_address_postcode,
              })}
              name="office_address_postcode"
              floatingLabel={t("address_postcode")}
              errors={errors}
              control={control}
              watch={watch}
            />
          </Fieldset>
        )}

        <FormField
          type="picker"
          control={control}
          name="previousbusiness"
          fullWidth
          topLabel={t("previousbusiness_label")}
          options={[
            { name: t("yes"), value: "yes" },
            { name: t("no"), value: "no" },
          ]}
          errors={errors}
        />

        {/* {error && <span className="form_error">{t("form_error")}</span>} */}
      </div>
      <div className="form_submit">
        <div className="form-invalid">
          {" "}
          {/* {isEmpty(errors) ? null : t("form_invalid")} */}
        </div>
        <Button
          type="submit"
          // form={currentStep.tabId}
          // func={nextStep}
          className="body--big-bold"
          text={`${t("form_continue")}: ${comingStep.tabLabel}`}
        />
      </div>
    </form>
  );
};
export default Business;
