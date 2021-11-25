import { nYearsFromNow } from "components/Field/helpers";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import states from "res/FormData/de/states.json";
import { sanitizeNumbers } from "res/lib";
import { useUserInteraction } from "userInteraction";
import Field from "components/Field";
import { useLocalFormVal } from "components/hooks/useLocalState";
import Fieldset from "../Fieldset";
import FormHeader from "../FormHeader";
import FormSubmit from "../FormSubmit";

import { taxIdValidator, validators } from "../validators";

const TaxInfo = ({ currentStep, nextStep, comingStep }) => {
  const { userInteraction, setUserInteraction } = useUserInteraction();
  const {
    register,
    handleSubmit,
    watch,
    errors,
    control,
    reset,
    getValues,
    formState,
  } = useForm({
    mode: userInteraction.stepsCompleted.includes("personalFields")
      ? "onChange"
      : "onBlur",
    reValidateMode: "onBlur",
  });

  const localFormVals = getValues();

  useLocalFormVal({
    key: "taxInfoFields",
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
        touchedScreens: [...userInteraction.touchedScreens, "taxInfoFields"],
      });
    }
  }, [formState.isDirty, setUserInteraction]);

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
    const projectedMonthly_secondYear = revenue_secondYear_value / 12;

    if (
      year === "first" &&
      chargeVAT_value === "no" &&
      ((13 - startMonth) / 12) * 22000 < revenue_firstYear_value
    ) {
      const error = t("revenue_firstYear_error", {
        estiYrRev: revenue_firstYear_value.toLocaleString("de"),
        projMonRev: projectedMonthly_firstYear
          .toLocaleString("de")
          .replace(/,\d\d\d/, trimMoney),
        projYrRev: (projectedMonthly_firstYear * 12).toLocaleString("de"),
      });
      return error;
    } else if (
      year === "second" &&
      chargeVAT_value === "no" &&
      revenue_secondYear_value > 50000
    ) {
      const error = t("revenue_secondYear_error", {
        estiYrRev: revenue_secondYear_value.toLocaleString("de"),
        projMonRev: projectedMonthly_secondYear
          .toLocaleString("de")
          .replace(/,\d\d\d/, trimMoney),
        projYrRev: revenue_secondYear_value.toLocaleString("de"),
      });

      return error;
    }
    return true;
  }

  const { t } = useTranslation();

  return (
    <>
      <form id={currentStep.tabId} onSubmit={handleSubmit(onSubmit)}>
        <div className="form">
          <Fieldset section>
            <FormHeader currentStep={currentStep} />
            <Field
              type="number"
              inputMode="numeric"
              name="steueridentifkationsnummer"
              ref={register({
                required: true,
                pattern: validators.steueridentifkationsnummer,
                validate: taxIdValidator,
              })}
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
          </Fieldset>
          <Fieldset section title={t("tax_info_your_strnum_fieldset_title")}>
            <Field
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
                  errors={errors}
                  topLabel={t("steuernummer_value_label")}
                />
                <Field
                  type="select"
                  name="steuernummer_state"
                  ref={register({
                    required: true,
                  })}
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
              topLabel={t("singleentry_label")}
            />
          </Fieldset>

          <Fieldset
            section
            title={t("tax_info_expected_income_fieldset_title")}
          >
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
              errors={errors}
              //   watch={watch}
              dateMinMax={{ dateMin: nYearsFromNow(90, "before") }}
              topLabel={t("startdate_label")}
            />
            <Field
              type="money"
              control={control}
              inputMode="numeric"
              name="revenue_firstYear"
              moneyRules={{ validate: (value) => validateKUN("first") }}
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
              type="money"
              control={control}
              inputMode="numeric"
              name="revenue_secondYear"
              // floatingLabel={t("revenue_secondYear_label")}
              placeholder={t("revenue_secondYear_placeholder")}
              moneyRules={{ validate: (value) => validateKUN("second") }}
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
              errors={errors}
              options={[
                { name: t("yes"), value: "no" },
                { name: t("no"), value: "yes" },
              ]}
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
              errors={errors}
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
        <FormSubmit
          gtagButton="#estimation"
          errors={errors}
          comingStep={comingStep}
        />
      </form>
    </>
  );
};
export default TaxInfo;
