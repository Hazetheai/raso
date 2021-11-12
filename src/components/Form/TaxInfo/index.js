import Button from "components/Button";
import { nYearsFromNow } from "components/Field/helpers";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import states from "res/FormData/states.json";
import { isEmpty } from "res/lib";
import Field from "../../Field";
import Fieldset from "../Fieldset";
import { sanitizeNumbers } from "../helpers";
import { taxIdValidator, validators } from "../validators";

const TaxInfo = ({
  steps,
  currentStep,
  nextStep,
  defaultValues,
  comingStep,
}) => {
  const { register, handleSubmit, watch, errors, control, reset } = useForm({
    mode: "onBlur",
    reValidateMode: "onBlur",
  });
  const onSubmit = (data) => nextStep(data, "taxInfoFields");

  const steuernummer_field_value = watch("steuernummer") || "";
  const revenue_firstYear_value =
    sanitizeNumbers(watch("revenue_firstYear")) || 0;
  const startdate_value = watch("startdate") || "";
  const revenue_secondYear_value =
    sanitizeNumbers(watch("revenue_secondYear")) || 0;
  const chargeVAT_value = watch("chargeVAT") || "";
  function trimMoney(match) {
    return match.slice(0, 3);
  }
  function validateKUN(year) {
    const startMonth = Number(startdate_value.split(".")[1]);
    const projectedMonthly_firstYear =
      revenue_firstYear_value / (13 - startMonth);

    if (
      year === "first" &&
      chargeVAT_value !== "yes" &&
      ((13 - startMonth) / 12) * 22000 < revenue_firstYear_value
    ) {
      const error = `According to your estimated revenue of €${revenue_firstYear_value.toLocaleString(
        "de"
      )} for your first year, your estimated monthly revenue is € ${projectedMonthly_firstYear
        .toLocaleString("de")
        .replace(/,\d\d\d/, trimMoney)}. 
      Your projected annual revenue for a full working year is €${(
        projectedMonthly_firstYear * 12
      ).toLocaleString("de")}.
                        As this is above the threshold for the small business owner (Kleinunternehmer) regulation,  you will need to charge VAT from your customers`;

      return error;
    } else if (
      year === "second" &&
      chargeVAT_value !== "yes" &&
      revenue_secondYear_value > 50000
    ) {
      const error = `According to your estimated revenue of €${revenue_secondYear_value.toLocaleString(
        "de"
      )} for your second year, 
      Your projected annual revenue for a full working year is €${revenue_secondYear_value.toLocaleString(
        "de"
      )}.
                        As this is above the threshold for the small business owner (Kleinunternehmer) regulation,  you will need to charge VAT from your customers`;

      return error;
    }
    return true;
  }

  const { t } = useTranslation();

  useEffect(() => {
    reset(defaultValues); // asynchronously reset your form values
  }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     sendAmplitudeData("WEB_SIGNUP_TABVIEW", {
  //       tab: "taxInfo",
  //     });
  //   }, 500);
  // }, []);
  return (
    <form id={currentStep.tabId} onSubmit={handleSubmit(onSubmit)}>
      {validateKUN()}
      <div className="form">
        <Field
          type="number"
          fullWidth
          inputMode="numeric"
          name="steueridentifkationsnummer"
          ref={register({
            required: true,
            pattern: validators.steueridentifkationsnummer,
            validate: taxIdValidator,
          })}
          autoFocus={true}
          errors={errors}
          watch={watch}
          fieldHelperText={t("steueridentifkationsnummer_helper", {
            interpolation: { escapeValue: false },
          })}
          expandedHelpers={[
            {
              title: t("steuernummer_helper_expand_title"),
              content: t("steuernummer_helper_expand_content", {
                interpolation: { escapeValue: false },
              }),
            },
            {
              title: t("steuernummer_helper_2_expand_title"),
              content: t("steuernummer_helper_2_expand_content", {
                interpolation: { escapeValue: false },
              }),
            },
          ]}
          topLabel={t("steueridentifkationsnummer_label")}
        />

        <Field
          fullWidth
          type="picker"
          control={control}
          name="steuernummer"
          topLabel={t("steuernummer_label")}
          options={[
            { name: t("yes"), value: "yes" },
            { name: t("no"), value: "no" },
          ]}
          errors={errors}
        />

        {steuernummer_field_value === "yes" && (
          <Fieldset subfield>
            <Field
              type="number"
              inputMode="numeric"
              name="steuernummer_value"
              placeholder={t("steuernummer_value_placeholder")}
              ref={register({
                required: true,
                pattern: validators.steuernummer_value,
              })}
              autoFocus={true}
              errors={errors}
              topLabel={t("steuernummer_value_label")}
            />
            <Field
              type="select"
              name="steuernummer_state"
              ref={register({
                required: true,
              })}
              autoFocus={true}
              errors={errors}
              options={states}
            />
          </Fieldset>
        )}
        <Field
          type="picker"
          control={control}
          name="singleentry"
          placeholder={t("singleentry_placeholder")}
          ref={register({
            required: true,
          })}
          autoFocus={true}
          errors={errors}
          expandedHelpers={[
            {
              title: t("singleentry_helper_expand_title", {
                interpolation: { escapeValue: false },
              }),
              content: t("singleentry_helper_expand_content", {
                interpolation: { escapeValue: false },
              }),
            },
          ]}
          options={[{ name: t("yes"), value: "yes" }]}
          fieldHelperText={t("singleentry_helper", {
            interpolation: { escapeValue: false },
          })}
          secondFieldHelperText={t("singleentry_helper_2", {
            interpolation: { escapeValue: false },
          })}
          topLabel={t("singleentry_label")}
        />

        <Fieldset title={t("tax_info_expected_income_fieldset_title")}>
          <Field
            type="jump-date"
            name="startdate"
            floatingLabel={t("date_format")}
            control={control}
            ref={register({
              required: true,
            })}
            expandedHelpers={[
              {
                title: t("startdate_helper_expand_title"),
                content: t("startdate_helper_expand_content", {
                  interpolation: { escapeValue: false },
                }),
              },
            ]}
            autoFocus={true}
            errors={errors}
            //   watch={watch}
            dateMinMax={{ dateMin: nYearsFromNow(90, "before") }}
            topLabel={t("startdate_label")}
          />
          <Field
            fullWidth
            type="money"
            control={control}
            inputMode="numeric"
            name="revenue_firstYear"
            moneyRules={{ validate: (value) => validateKUN("first") }}
            autoFocus={true}
            errors={errors}
            fieldHelperText={t("revenue_firstYear_helper", {
              interpolation: { escapeValue: false },
            })}
            expandedHelpers={[
              {
                title: t("revenue_firstYear_helper_expand_title"),
                content: t("revenue_firstYear_helper_expand_content", {
                  interpolation: { escapeValue: false },
                }),
              },
              {
                title: t("revenue_firstYear_helper_2_expand_title"),
                content: t("revenue_firstYear_helper_2_expand_content", {
                  interpolation: { escapeValue: false },
                }),
              },
              {
                title: t("revenue_firstYear_helper_3_expand_title"),
                content: t("revenue_firstYear_helper_3_expand_content", {
                  interpolation: { escapeValue: false },
                }),
              },
            ]}
            topLabel={t("revenue_firstYear_label")}
          />
          <Field
            fullWidth
            type="money"
            control={control}
            inputMode="numeric"
            name="revenue_secondYear"
            // floatingLabel={t("revenue_secondYear_label")}
            placeholder={t("revenue_secondYear_placeholder")}
            moneyRules={{ validate: (value) => validateKUN("second") }}
            autoFocus={true}
            errors={errors}
            fieldHelperText={t("revenue_secondYear_helper", {
              interpolation: { escapeValue: false },
            })}
            topLabel={t("revenue_secondYear_label")}
          />
          <Field
            type="picker"
            control={control}
            name="chargeVAT"
            // floatingLabel={t("chargeVAT_label")}
            placeholder={t("chargeVAT_placeholder")}
            ref={register({
              required: true,
            })}
            autoFocus={true}
            errors={errors}
            options={[
              { name: t("yes"), value: "yes" },
              { name: t("no"), value: "no" },
            ]}
            fullWidth
            fieldHelperText={t("chargeVAT_helper", {
              interpolation: { escapeValue: false },
            })}
            topLabel={t("chargeVAT_label")}
            expandedHelpers={[
              {
                title: t("chargeVAT_expand_helper_title"),
                content: t("chargeVAT_expand_helper_content", {
                  interpolation: { escapeValue: false },
                }),
              },
              {
                title: t("chargeVAT_expand_helper_2_title"),
                content: t("chargeVAT_expand_helper_2_content", {
                  interpolation: { escapeValue: false },
                }),
              },
            ]}
          />
          <Field
            type="picker"
            control={control}
            name="askVATnumber"
            // floatingLabel={t("askVATnumber_label")}
            placeholder={t("askVATnumber_placeholder")}
            ref={register({
              required: true,
            })}
            autoFocus={true}
            errors={errors}
            fullWidth
            options={[
              { name: t("yes"), value: "yes" },
              { name: t("no"), value: "no" },
            ]}
            fieldHelperText={t("askVATnumber_helper", {
              interpolation: { escapeValue: false },
            })}
            topLabel={t("askVATnumber_label")}
            expandedHelpers={[
              {
                title: t("askVATnumber_expand_helper_title"),
                content: t("askVATnumber_expand_helper_content", {
                  interpolation: { escapeValue: false },
                }),
              },
            ]}
          />
        </Fieldset>
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
        />
      </div>
    </form>
  );
};
export default TaxInfo;
