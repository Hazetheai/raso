import Button from "components/Button";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { gtagEvent } from "res/gtag";
import { useUserInteraction } from "userInteraction";
import Field from "../../Field";
import { useLocalFormVal } from "../../hooks/useLocalState";
import Fieldset from "../Fieldset";
import { validators } from "../validators";

const TaxEstimate = ({ currentStep, nextStep, comingStep }) => {
  const { userInteraction, setUserInteraction } = useUserInteraction();
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
    mode: userInteraction.stepsCompleted.includes("personalFields")
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
    <form id={currentStep.tabId} onSubmit={handleSubmit(onSubmit)}>
      <div className="form">
        {console.log(`errors`, errors)}
        <Fieldset title={t("tax_estimate_projected_profit_fieldset_label")}>
          {/* New Profit UX */}

          <Field
            type="money"
            control={control}
            inputMode="numeric"
            topLabel={t("profitFirstYear_label")}
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
            topLabel={t("profitSecondYear_label")}
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
        <Fieldset title={t("tax_estimate_other_income_fieldset_label")}>
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
                topLabel={t("profitNichtselbstandiger_FirstYear_label")}
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
                topLabel={t("profitNichtselbstandiger_SecondYear_label")}
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
                topLabel={t("profitKapitalvermogen_FirstYear_label")}
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
                topLabel={t("profitKapitalvermogen_SecondYear_label")}
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
                topLabel={t("profitVermietung_FirstYear_label")}
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
                topLabel={t("profitVermietung_SecondYear_label")}
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
                topLabel="Erstes Geschäftsjahr (2021)"
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
                topLabel="Zweites Geschäftsjahr (2021)"
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
        </Fieldset>

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
              topLabel={t("sonderausgabenFirstYear_label")}
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
              topLabel={t("sonderausgabenSecondYear_label")}
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
              topLabel={t("steuerabzugsbetrageFirstYear_label")}
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
              topLabel={t("steuerabzugsbetrageSecondYear_label")}
              name="steuerabzugsbetrageSecondYear"
              ref={register({
                required: true,
              })}
              errors={errors}
              watch={watch}
            />
          </Fieldset>
        )}
      </div>
      <div className="form_submit">
        {/* {oneOfRequired.includes("yes") ? ( */}
        <>
          <div className="form-invalid">
            {" "}
            {/* {isEmpty(errors) ? null : t("form_invalid")} */}
          </div>
          <Button
            type="submit"
            className="body--big-bold"
            text={`${t("form_continue")}: ${comingStep.tabLabel}`}
            func={() => {
              gtagEvent("RASO_CLICKED_BUTTON-ITER-1", { button: "#review" });
            }}
          />
        </>
        {/* ) : (
          <div className="form-warning">
            <h4>
              {t("tax_estimate_form_warning")}
              <br />{" "}
            </h4>
            <p>
              <Link inline href="#profitFreiberufler">
                {t("freelancer")}
              </Link>
              {" / "}
              <Link inline href="#profitGewerbetreibender">
                {t("commercial")}
              </Link>
              {" / "}
              <Link inline href="#profitVermietung">
                {t("renting")}
              </Link>
            </p>
          </div>
        )} */}
      </div>
    </form>
  );
};
export default TaxEstimate;
