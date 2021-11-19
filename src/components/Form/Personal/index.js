import Button from "components/Button";
import { nYearsFromNow } from "components/Field/helpers";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import genders_de from "res/FormData/de/gender.json";
import marital_status_de from "res/FormData/de/marital_status.json";
import religion_de from "res/FormData/de/religion.json";
import religion_en from "res/FormData/en/religion.json";
import genders_en from "res/FormData/en/gender.json";
import marital_status_en from "res/FormData/en/marital_status.json";
import { useUserInteraction } from "userInteraction";
import { sendAmplitudeData } from "res/amplitude";
import Field from "../../Field";
import { useLocalFormVal } from "../../hooks/useLocalState";
import Fieldset from "../Fieldset";
import { emailValidator, validators } from "../validators";
import { gtagEvent } from "res/gtag";

const Personal = ({ nextStep, comingStep, currentStep }) => {
  const { userInteraction, setUserInteraction } = useUserInteraction();

  const {
    register,
    handleSubmit,
    watch,
    errors,
    control,
    reset,
    formState,
    getValues,
  } = useForm({
    mode: userInteraction.stepsCompleted.includes("personalFields")
      ? "onChange"
      : "onBlur",
  });

  const { t, i18n } = useTranslation();

  const onSubmit = (data) => nextStep(data, "personalFields");

  const moved_value = watch("moved");
  const maritalstatus_value = watch("maritalstatus");
  const localFormVals = getValues();

  useLocalFormVal({
    key: "personalFields",
    reset,
    localFormVals,
    errors,
  });

  useEffect(() => {
    if (
      formState.isDirty &&
      !userInteraction.touchedScreens.includes(currentStep.tabId)
    ) {
      setUserInteraction({
        startedFilling: true,
        touchedScreens: [...userInteraction.touchedScreens, "personalFields"],
      });
    }
  }, [formState.isDirty, setUserInteraction]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     sendAmplitudeData("WEB_SIGNUP_TABVIEW", {
  //       tab: "personal",
  //     });
  //   }, 500);
  // }, []);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form">
        <Field
          type="text"
          name="firstname"
          ref={register({
            required: true,
            maxLength: 80,
            pattern: validators.firstname,
          })}
          errors={errors}
          watch={watch}
          topLabel={t("firstname_label")}
        />

        <Field
          type="text"
          name="name"
          ref={register({
            required: true,
            maxLength: 80,
            pattern: validators.name,
          })}
          errors={errors}
          watch={watch}
          topLabel={t("name_label")}
        />
        <Field
          type="email"
          name="email"
          ref={register({
            required: true,
            validate: emailValidator,
            pattern: validators.email,
          })}
          topLabel={t("email_label")}
          errors={errors}
          watch={watch}
        />
        <Field
          type="phone"
          name="phone"
          topLabel={t("phone_label")}
          errors={errors}
          control={control}
        />
        <Field
          type="jump-date"
          name="birthdate"
          floatingLabel={t("date_format")}
          topLabel={t("birthdate_label")}
          errors={errors}
          control={control}
          dateMinMax={{
            dateMin: nYearsFromNow(90, "before"),
            dateMax: nYearsFromNow(18, "before"),
          }}
        />
        <Field
          type="select"
          name="gender"
          topLabel={t("gender")}
          helperBelow
          ref={register({
            required: true,
            validate: (value) => !/choose/.test(value),
          })}
          fieldHelperText={t("gender_helper")}
          options={i18n.language === "de" ? genders_de : genders_en}
          errors={errors}
          control={control}
        />

        <Fieldset>
          <Field
            type="text"
            name="address_street"
            floatingLabel={t("address_street")}
            ref={register({
              required: true,
              pattern: validators.address_street,
            })}
            watch={watch}
            errors={errors}
            control={control}
            topLabel={t("address_label")}
            expandedHelpers={[
              {
                title: t("address_helper_expand_title"),
                content: t("address_helper_expand_content", {
                  interpolation: { escapeValue: false },
                }),
              },
              {
                title: t("address_helper_expand_2_title"),
                content: t("address_helper_expand_2_content"),
                cs: true,
              },
            ]}
          />
          <Field
            ref={register({
              required: true,
              pattern: validators.address_number,
            })}
            type="text"
            name="address_number"
            floatingLabel={t("address_number")}
            errors={errors}
            control={control}
            watch={watch}
          />
          <Field
            ref={register({
              required: true,
              pattern: validators.address_postcode,
            })}
            type="text"
            name="address_postcode"
            floatingLabel={t("address_postcode")}
            errors={errors}
            control={control}
            watch={watch}
          />
          <Field
            ref={register({
              required: true,
              pattern: validators.address_city,
            })}
            type="text"
            name="address_city"
            floatingLabel={t("address_city")}
            errors={errors}
            control={control}
            watch={watch}
          />
        </Fieldset>

        <Field
          type="select"
          name="maritalstatus"
          topLabel={t("maritalstatus_label")}
          ref={register({
            required: true,
            validate: (value) => !/choose/.test(value),
          })}
          options={
            i18n.language === "de" ? marital_status_de : marital_status_en
          }
          errors={errors}
          control={control}
          watch={watch}
        />

        {["002", "003", "004", "005", "006", "007", "008"].includes(
          maritalstatus_value
        ) && (
          <Fieldset subfield>
            <Field
              type="jump-date"
              name="maritalstatusdate"
              topLabel={t("maritalstatusdate_label")}
              floatingLabel={t("date_format")}
              errors={errors}
              control={control}
            />
            {["002", "003"].includes(maritalstatus_value) && (
              <>
                <Field
                  type="text"
                  name="partner_firstname"
                  ref={register({
                    required: true,
                    maxLength: 80,
                    pattern: validators.partner_firstname,
                  })}
                  errors={errors}
                  watch={watch}
                  topLabel={t("partner_firstname_label")}
                />
                <Field
                  type="text"
                  name="partner_name"
                  ref={register({
                    required: true,
                    maxLength: 80,
                    pattern: validators.partner_name,
                  })}
                  errors={errors}
                  watch={watch}
                  topLabel={t("partner_name_label")}
                />
                <Field
                  type="select"
                  name="partner_gender"
                  topLabel={t("partner_gender")}
                  helperBelow
                  ref={register({
                    required: true,
                    validate: (value) => !/choose/.test(value),
                  })}
                  fieldHelperText={t("gender_helper", {
                    interpolation: { escapeValue: false },
                  })}
                  options={i18n.language === "de" ? genders_de : genders_en}
                  errors={errors}
                  control={control}
                />
                <Field
                  type="jump-date"
                  name="partner_birthdate"
                  topLabel={t("partner_birthdate_label")}
                  errors={errors}
                  control={control}
                  floatingLabel="TT.MM.JJJJ"
                  dateMinMax={{
                    dateMin: nYearsFromNow(90, "before"),
                    dateMax: nYearsFromNow(18, "before"),
                  }}
                />

                <Field
                  type="select"
                  name="partner_religion"
                  //floatingLabel={""}
                  ref={register({
                    required: true,
                    validate: (value) => !/choose/.test(value),
                  })}
                  fullWidth
                  topLabel={t("partner_religion_label")}
                  options={i18n.language === "de" ? religion_de : religion_en}
                  errors={errors}
                  control={control}
                />
              </>
            )}
          </Fieldset>
        )}

        <Field
          type="select"
          name="religion"
          fullWidth
          topLabel={t("religion_label")}
          fieldHelperText={t("religion_heper", {
            interpolation: { escapeValue: false },
          })}
          options={i18n.language === "de" ? religion_de : religion_en}
          ref={register({
            required: true,
            validate: (value) => !/choose/.test(value),
          })}
          errors={errors}
          control={control}
        />

        <Field
          type="picker"
          control={control}
          name="moved"
          fullWidth
          topLabel={t("moved_label")}
          options={[
            { name: t("yes"), value: "yes" },
            { name: t("no"), value: "no" },
          ]}
          //floatingLabel={t("tax_status_label")}
          fieldHelperText={t("moved_helper", {
            interpolation: { escapeValue: false },
          })}
          errors={errors}
        />

        {moved_value === "yes" && (
          <Fieldset subfield>
            <Field
              type="text"
              watch={watch}
              name="past_address_street"
              floatingLabel={t("address_street")}
              errors={errors}
              ref={register({
                required: true,
                pattern: validators.past_address_street,
              })}
              control={control}
              topLabel="Adresse"
            />
            <Field
              type="text"
              watch={watch}
              name="past_address_number"
              floatingLabel={t("address_number")}
              errors={errors}
              ref={register({
                required: true,
                pattern: validators.past_address_number,
              })}
              control={control}
            />
            <Field
              type="text"
              watch={watch}
              name="past_address_postcode"
              floatingLabel={t("address_postcode")}
              errors={errors}
              ref={register({
                required: true,
                pattern: validators.past_address_postcode,
              })}
              control={control}
            />
            <Field
              type="text"
              watch={watch}
              name="past_address_city"
              floatingLabel={t("address_city")}
              errors={errors}
              ref={register({
                required: true,
                pattern: validators.past_address_city,
              })}
              control={control}
            />
            <Field
              type="jump-date"
              name="movingdate"
              topLabel={t("movingdate_label")}
              floatingLabel={t("date_format")}
              errors={errors}
              ref={register({
                required: true,
              })}
              control={control}
            />
          </Fieldset>
        )}

        <Field
          type="checkbox"
          control={control}
          name="optin"
          fullWidth
          options={[
            {
              name: t("optin_label"),
              value: true,
              required: false,
              default: false,
            },
          ]}
          errors={errors}
        />
      </div>
      <div className="form_submit">
        <div className="form-invalid">
          {" "}
          {/* {isEmpty(errors) ? null : t("form_invalid")} */}
        </div>
        <Button
          type="submit"
          className="body--big-bold"
          text={`${t("form_continue")}: ${comingStep.tabLabel}`}
          func={() => {
            gtagEvent("RASO_CLICKED_BUTTON-ITER-1", { button: "#business" });
          }}
        />
      </div>
    </form>
  );
};
export default Personal;
