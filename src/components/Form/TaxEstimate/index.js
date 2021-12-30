import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useUserData } from "data-layer/userData";
import { useUserInteraction } from "data-layer/userInteraction";
import Field from "../../Field";
import { useLocalFormVal } from "../../../hooks/useLocalState";
import Fieldset from "../Fieldset";
import FormHeader from "../FormHeader";
import FormSubmit from "../FormSubmit";
import { validators } from "../validators";

const TaxEstimate = ({ currentStep, nextStep, comingStep }) => {
  const { userInteraction, setUserInteraction } = useUserInteraction();
  const { userData, setUserData } = useUserData();
  const {
    register,
    handleSubmit,
    watch,
    errors,
    control,
    reset,
    setError,
    formState,
    getValues,
  } = useForm({
    mode: userInteraction.stepsCompleted.includes("taxEstimateFields")
      ? "onChange"
      : "onBlur",
  });
  const { t, i18n } = useTranslation();
  const localFormVals = getValues();

  useLocalFormVal({
    key: "taxEstimateFields",
    reset,
    localFormVals,
    errors,
  });

  const yearOne =
    Number(userData["taxInfoFields"]?.startdate.y) || new Date().getFullYear();
  const yearTwo = yearOne + 1;

  useEffect(() => {
    if (
      formState.isDirty &&
      !userInteraction.touchedScreens.includes(currentStep.tabId)
    ) {
      setUserInteraction({
        startedFilling: true,
        touchedScreens: [
          ...userInteraction.touchedScreens,
          "taxEstimateFields",
        ],
      });
    }
  }, [formState.isDirty, setUserInteraction]);

  useEffect(() => {
    window.addEventListener("hashchange", () => {
      setError(window.location.hash.replace(/#/, ""), {
        type: "manual",
        message: t("field_required"),
        shouldFocus: true,
      });
    });
  }, [setError, t]);

  const onSubmit = (data) => nextStep(data, "taxEstimateFields");
  const profitNichtselbstandiger_field_value = watch(
    "profitNichtselbstandiger"
  );
  const profitKapitalvermogen_field_value = watch("profitKapitalvermogen");
  const profitVermietung_field_value = watch("profitVermietung");
  const profitSonstigen_field_value = watch("profitSonstigen");

  const taxPrepayment_field_value = watch("taxPrepayment");

  const pickerRules = {
    required: true,
  };

  return (
    <>
      <form id={currentStep.tabId} onSubmit={handleSubmit(onSubmit)}>
        <div className="form">
          <Fieldset section>
            <FormHeader currentStep={currentStep} />

            <Fieldset title={t("tax_estimate_projected_profit_fieldset_label")}>
              {/* New Profit UX */}

              <Field
                type="money"
                control={control}
                inputMode="numeric"
                topLabel={t("profitFirstYear_label", {
                  yearOne: `(${yearOne})`,
                })}
                name="profitFirstYear"
                ref={register({
                  required: true,
                  pattern: validators.profitFirstYear,
                })}
                errors={errors}
                watch={watch}
                fieldHelperText={t("profitFirstYear_helper", {
                  interpolation: { escapeValue: false },
                })}
                expandedHelpers={[
                  {
                    title: t("profit_expand_helper_title"),
                    content: t("profit_expand_helper_content", {
                      interpolation: { escapeValue: false },
                    }),
                  },
                  {
                    title: t("profit_expand_helper_2_title"),
                    content: t("profit_expand_helper_2_content", {
                      interpolation: { escapeValue: false },
                    }),
                  },
                ]}
              />
              <Field
                type="money"
                control={control}
                inputMode="numeric"
                topLabel={t("profitSecondYear_label", {
                  yearTwo: `(${yearTwo})`,
                })}
                name="profitSecondYear"
                ref={register({
                  required: true,
                  pattern: validators.profitSecondYear,
                })}
                errors={errors}
                watch={watch}
              />

              <Field
                type="picker"
                control={control}
                topLabel={t("freiberufler_oder_gewerbetreibender_label")}
                name="freiberufler_oder_gewerbetreibender"
                errors={errors}
                ref={register({
                  required: true,
                })}
                pickerRules={pickerRules}
                watch={watch}
                options={[
                  {
                    name:
                      i18n.language === "de"
                        ? t("freelancer")
                        : t("freelancer", { lng: "de" }) +
                          ` (${t("freelancer", { lng: "en" })})`,
                    value: "freelancer",
                  },
                  {
                    name:
                      i18n.language === "de"
                        ? t("commercial")
                        : t("commercial", { lng: "de" }) +
                          ` (${t("commercial", { lng: "en" })})`,
                    value: "commercial",
                  },
                ]}
              />
            </Fieldset>
          </Fieldset>

          <Fieldset
            section
            title={t("tax_estimate_other_income_fieldset_label")}
          >
            {/* Income Field - profitNichtselbstandiger */}
            <Field
              type="picker"
              control={control}
              topLabel={t("profitNichtselbstandiger_label")}
              fieldHelperText={t("profitNichtselbstandiger_helper", {
                interpolation: { escapeValue: false },
              })}
              name="profitNichtselbstandiger"
              ref={register({
                required: true,
              })}
              errors={errors}
              watch={watch}
              options={[
                { name: t("yes"), value: "yes" },
                { name: t("no"), value: "no" },
              ]}
            />

            {profitNichtselbstandiger_field_value === "yes" && (
              <Fieldset subfield>
                <Field
                  type="money"
                  control={control}
                  inputMode="numeric"
                  topLabel={t("profitNichtselbstandiger_FirstYear_label", {
                    yearOne: `(${yearOne})`,
                  })}
                  name="profitNichtselbstandigerFirstYear"
                  ref={register({
                    required: true,
                    pattern: validators.profitNichtselbstandigerFirstYear,
                  })}
                  errors={errors}
                  watch={watch}
                />
                <Field
                  type="money"
                  control={control}
                  inputMode="numeric"
                  topLabel={t("profitNichtselbstandiger_SecondYear_label", {
                    yearTwo: `(${yearTwo})`,
                  })}
                  name="profitNichtselbstandigerSecondYear"
                  ref={register({
                    required: true,
                    pattern: validators.profitNichtselbstandigerSecondYear,
                  })}
                  errors={errors}
                  watch={watch}
                />
              </Fieldset>
            )}
            {/* Income Field - END */}
            {/* Income Field - profitKapitalvermogen */}
            <Field
              type="picker"
              control={control}
              inputMode=""
              topLabel={t("profitKapitalvermogen_label")}
              fieldHelperText={t("profitKapitalvermogen_helper", {
                interpolation: { escapeValue: false },
              })}
              name="profitKapitalvermogen"
              ref={register({
                required: true,
              })}
              errors={errors}
              watch={watch}
              options={[
                { name: t("yes"), value: "yes" },
                { name: t("no"), value: "no" },
              ]}
            />

            {profitKapitalvermogen_field_value === "yes" && (
              <Fieldset subfield>
                <Field
                  type="money"
                  control={control}
                  inputMode="numeric"
                  topLabel={t("profitKapitalvermogen_FirstYear_label", {
                    yearOne: `(${yearOne})`,
                  })}
                  name="profitKapitalvermogenFirstYear"
                  ref={register({
                    required: true,
                    pattern: validators.profitKapitalvermogenFirstYear,
                  })}
                  errors={errors}
                  watch={watch}
                />
                <Field
                  type="money"
                  control={control}
                  inputMode="numeric"
                  topLabel={t("profitKapitalvermogen_SecondYear_label", {
                    yearTwo: `(${yearTwo})`,
                  })}
                  name="profitKapitalvermogenSecondYear"
                  ref={register({
                    required: true,
                    pattern: validators.profitKapitalvermogenSecondYear,
                  })}
                  errors={errors}
                  watch={watch}
                />
              </Fieldset>
            )}
            {/* Income Field - END */}
            {/* Income Field - profitVermietung */}
            <Field
              type="picker"
              control={control}
              inputMode=""
              topLabel={t("profitVermietung_label")}
              fieldHelperText={t("profitVermietung_helper", {
                interpolation: { escapeValue: false },
              })}
              name="profitVermietung"
              ref={register({
                required: true,
              })}
              errors={errors}
              watch={watch}
              options={[
                { name: t("yes"), value: "yes" },
                { name: t("no"), value: "no" },
              ]}
            />

            {profitVermietung_field_value === "yes" && (
              <Fieldset subfield>
                <Field
                  type="money"
                  control={control}
                  inputMode="numeric"
                  topLabel={t("profitVermietung_FirstYear_label", {
                    yearOne: `(${yearOne})`,
                  })}
                  name="profitVermietungFirstYear"
                  ref={register({
                    required: true,
                    pattern: validators.profitVermietungFirstYear,
                  })}
                  errors={errors}
                  watch={watch}
                />
                <Field
                  type="money"
                  control={control}
                  inputMode="numeric"
                  topLabel={t("profitVermietung_SecondYear_label", {
                    yearTwo: `(${yearTwo})`,
                  })}
                  name="profitVermietungSecondYear"
                  ref={register({
                    required: true,
                    pattern: validators.profitVermietungSecondYear,
                  })}
                  errors={errors}
                  watch={watch}
                />
              </Fieldset>
            )}
            {/* Income Field - END */}
            {/* Income Field - profitSonstigen */}
            <Field
              type="picker"
              control={control}
              inputMode=""
              topLabel={t("profitSonstigen_label")}
              fieldHelperText={t("profitSonstigen_helper", {
                interpolation: { escapeValue: false },
              })}
              name="profitSonstigen"
              ref={register({
                required: true,
              })}
              errors={errors}
              watch={watch}
              options={[
                { name: t("yes"), value: "yes" },
                { name: t("no"), value: "no" },
              ]}
            />

            {profitSonstigen_field_value === "yes" && (
              <Fieldset subfield>
                <Field
                  type="money"
                  control={control}
                  inputMode="numeric"
                  topLabel={t("profitSonstigen_FirstYear_label", {
                    yearOne: `(${yearOne})`,
                  })}
                  name="profitSonstigenFirstYear"
                  ref={register({
                    required: true,
                    pattern: validators.profitSonstigenFirstYear,
                  })}
                  errors={errors}
                  watch={watch}
                />
                <Field
                  type="money"
                  control={control}
                  inputMode="numeric"
                  topLabel={t("profitSonstigen_SecondYear_label", {
                    yearTwo: `(${yearTwo})`,
                  })}
                  name="profitSonstigenSecondYear"
                  ref={register({
                    required: true,
                    pattern: validators.profitSonstigenSecondYear,
                  })}
                  errors={errors}
                  watch={watch}
                />
              </Fieldset>
            )}
            {/* Income Field - END */}

            <Field
              type="picker"
              control={control}
              inputMode=""
              topLabel={t("profitAgriculture_label")}
              name="profitAgriculture"
              ref={register({
                required: true,
              })}
              options={[{ name: t("no"), value: "no" }]}
              errors={errors}
              watch={watch}
              fieldHelperText={t("profitAgriculture_helper", {
                interpolation: { escapeValue: false },
              })}
            />
            <Field
              type="picker"
              control={control}
              topLabel={t("taxPrepayment_label")}
              name="taxPrepayment"
              ref={register({
                required: true,
              })}
              options={[
                { name: t("yes"), value: "yes" },
                { name: t("no"), value: "no" },
              ]}
              errors={errors}
              watch={watch}
              fieldHelperText={t("taxPrepayment_helper", {
                interpolation: { escapeValue: false },
              })}
            />

            {taxPrepayment_field_value === "yes" && (
              <Fieldset
                title={t("tax_estimate_sonderausgaben_fieldset_title")}
                helper={t("tax_estimate_sonderausgaben_fieldset_helper", {
                  interpolation: { escapeValue: false },
                })}
                subfield
              >
                <Field
                  type="money"
                  control={control}
                  inputMode="numeric"
                  topLabel={t("sonderausgabenFirstYear_label", {
                    yearOne: `(${yearOne})`,
                  })}
                  name="sonderausgabenFirstYear"
                  ref={register({
                    required: true,
                  })}
                  errors={errors}
                  watch={watch}
                />
                <Field
                  type="money"
                  control={control}
                  inputMode="numeric"
                  topLabel={t("sonderausgabenSecondYear_label", {
                    yearTwo: `(${yearTwo})`,
                  })}
                  name="sonderausgabenSecondYear"
                  ref={register({
                    required: true,
                  })}
                  errors={errors}
                  watch={watch}
                />
              </Fieldset>
            )}
            {taxPrepayment_field_value === "yes" && (
              <Fieldset
                title={t("tax_estimate_steuerabzugsbetrage_fieldset_title")}
                helper={t("tax_estimate_steuerabzugsbetrage_fieldset_helper", {
                  interpolation: { escapeValue: false },
                })}
                subfield
              >
                <Field
                  type="money"
                  control={control}
                  inputMode="numeric"
                  topLabel={t("steuerabzugsbetrageFirstYear_label", {
                    yearOne: `(${yearOne})`,
                  })}
                  name="steuerabzugsbetrageFirstYear"
                  ref={register({
                    required: true,
                  })}
                  errors={errors}
                  watch={watch}
                />
                <Field
                  type="money"
                  control={control}
                  inputMode="numeric"
                  topLabel={t("steuerabzugsbetrageSecondYear_label", {
                    yearTwo: `(${yearTwo})`,
                  })}
                  name="steuerabzugsbetrageSecondYear"
                  ref={register({
                    required: true,
                  })}
                  errors={errors}
                  watch={watch}
                />
              </Fieldset>
            )}
          </Fieldset>
        </div>
        <FormSubmit
          gtagButton="#review"
          errors={errors}
          comingStep={comingStep}
        />
      </form>
    </>
  );
};
export default TaxEstimate;
