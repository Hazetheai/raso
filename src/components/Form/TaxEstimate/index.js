import Button from "components/Button";
import Link from "components/Link";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Field from "../../Field";
import Fieldset from "../Fieldset";
import { validators } from "../validators";

const TaxEstimate = ({
  steps,
  currentStep,
  nextStep,
  defaultValues,
  comingStep,
}) => {
  const { register, handleSubmit, watch, errors, control, reset, setError } =
    useForm({
      mode: "onBlur",
    });
  const { t } = useTranslation();

  useEffect(() => {
    window.addEventListener("hashchange", () => {
      setError(window.location.hash.replace(/#/, ""), {
        type: "manual",
        message: t("field_required"),
        shouldFocus: true,
      });
    });
  }, [setError, t]);

  useEffect(() => {
    reset(defaultValues); // asynchronously reset your form values
  }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     sendAmplitudeData("WEB_SIGNUP_TABVIEW", {
  //       tab: "taxEstimate",
  //     });
  //   }, 500);
  // }, []);

  const onSubmit = (data) => nextStep(data, "taxEstimateFields");
  const profitFreiberufler_field_value = watch("profitFreiberufler");
  const profitGewerbetreibender_field_value = watch("profitGewerbetreibender");
  const profitNichtselbstandiger_field_value = watch(
    "profitNichtselbstandiger"
  );
  const profitKapitalvermogen_field_value = watch("profitKapitalvermogen");
  const profitVermietung_field_value = watch("profitVermietung");
  const profitSonstigen_field_value = watch("profitSonstigen");

  const taxPrepayment_field_value = watch("taxPrepayment");

  const oneOfRequired = [
    profitFreiberufler_field_value,
    profitGewerbetreibender_field_value,
    profitVermietung_field_value,
  ];

  const pickerRules = {
    required: true,
    validate: (value) => {
      return (
        value === "yes" ||
        oneOfRequired.includes("yes") ||
        `Eine dieser Einkommensarten muss ausgefüllt werden: 
      Freiberufler / Gewerbtreibende / Vermietung und Verpachtung`
      );
    },
  };

  return (
    <form id={currentStep.tabId} onSubmit={handleSubmit(onSubmit)}>
      <div className="form">
        {console.log(`errors`, errors)}
        <Fieldset title={t("tax_estimate_projected_profit_fieldset_label")}>
          {/* Income Field - profitFreiberufler */}
          <Field
            type="picker"
            control={control}
            inputMode=""
            topLabel={t("profitFreiberufler_label")}
            name="profitFreiberufler"
            ref={register({
              required: true,
            })}
            pickerRules={pickerRules}
            autoFocus={true}
            errors={errors}
            watch={watch}
            options={[
              { name: t("yes"), value: "yes" },
              { name: t("no"), value: "no" },
            ]}
            expandedHelpers={[
              {
                title: t("profitFreiberufler_expand_helper_title"),
                content: t("profitFreiberufler_expand_helper_content", {
                  interpolation: { escapeValue: false },
                }),
              },
              {
                title: "Wie schätze ich meinen Gewinn?",
                content: `Du kannst von deinen voraussichtlichen Einnahmen die geschätzten Ausgaben abziehen und so deinen <a href="https://www.accountable.de/blog/fragebogen-zur-steuerlichen-erfassung-so-berechnest-du-deinen-gewinn-aus-der-selbststandigkeit/" target="_blank"> Gewinn</a> berechnen. Keine Sorge, das Finanzamt erwartet keine perfekte Voraussage deines Gewinns. <br/><br/>
                Anhand deiner Schätzung wird das Finanzamt die Steuervorauszahlungen festlegen. Mit deiner Steuererklärung am Ende des Jahres wirst du zu viel gezahlte Steuer zurückbekommen oder zu wenig gezahlte Steuer nachzahlen.
                `,
              },
            ]}
          />

          {profitFreiberufler_field_value === "yes" && (
            <Fieldset subfield>
              <Field
                type="money"
                control={control}
                inputMode="numeric"
                topLabel={t("profitFreiberuflerFirstYear_label")}
                name="profitFreiberuflerFirstYear"
                ref={register({
                  required: true,
                  pattern: validators.profitFreiberuflerFirstYear,
                })}
                autoFocus={true}
                errors={errors}
                watch={watch}
                fieldHelperText={t("profitFreiberuflerFirstYear_helper", {
                  interpolation: { escapeValue: false },
                })}
              />
              <Field
                type="money"
                control={control}
                inputMode="numeric"
                topLabel={t("profitFreiberuflerSecondYear_label")}
                name="profitFreiberuflerSecondYear"
                ref={register({
                  required: true,
                  pattern: validators.profitFreiberuflerSecondYear,
                })}
                autoFocus={true}
                errors={errors}
                watch={watch}
              />
            </Fieldset>
          )}

          {/* Income Field - END */}

          {/* Income Field - profitGewerbetreibender */}
          <Field
            type="picker"
            control={control}
            fullWidth
            topLabel={t("profitGewerbetreibender_label")}
            name="profitGewerbetreibender"
            ref={register({
              required: true,
            })}
            autoFocus={true}
            errors={errors}
            watch={watch}
            options={[
              { name: t("yes"), value: "yes" },
              { name: t("no"), value: "no" },
            ]}
          />

          {profitGewerbetreibender_field_value === "yes" && (
            <Fieldset subfield>
              <Field
                type="money"
                control={control}
                inputMode="numeric"
                topLabel={t("profitGewerbetreibenderFirstYear_label")}
                name="profitGewerbetreibenderFirstYear"
                ref={register({
                  required: true,
                  pattern: validators.profitGewerbetreibenderFirstYear,
                })}
                autoFocus={true}
                errors={errors}
                watch={watch}
              />
              <Field
                type="money"
                control={control}
                inputMode="numeric"
                fieldHelperText={t("profitGewerbetreibenderSecondYear_helper", {
                  interpolation: { escapeValue: false },
                })}
                topLabel={t("profitGewerbetreibenderSecondYear_label")}
                name="profitGewerbetreibenderSecondYear"
                ref={register({
                  required: true,
                  pattern: validators.profitGewerbetreibenderSecondYear,
                })}
                autoFocus={true}
                errors={errors}
                watch={watch}
              />
            </Fieldset>
          )}
          {/* Income Field - END */}
        </Fieldset>
        <Fieldset title={t("tax_estimate_other_income_fieldset_label")}>
          {/* Income Field - profitNichtselbstandiger */}
          <Field
            type="picker"
            control={control}
            fullWidth
            topLabel={t("profitNichtselbstandiger_label")}
            fieldHelperText={t("profitNichtselbstandiger_helper", {
              interpolation: { escapeValue: false },
            })}
            name="profitNichtselbstandiger"
            ref={register({
              required: true,
            })}
            autoFocus={true}
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
                autoFocus={true}
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
                autoFocus={true}
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
            fullWidth
            inputMode=""
            topLabel={t("profitKapitalvermogen_label")}
            fieldHelperText={t("profitKapitalvermogen_helper", {
              interpolation: { escapeValue: false },
            })}
            name="profitKapitalvermogen"
            ref={register({
              required: true,
            })}
            autoFocus={true}
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
                autoFocus={true}
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
                autoFocus={true}
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
            fullWidth
            inputMode=""
            topLabel={t("profitVermietung_label")}
            fieldHelperText={t("profitVermietung_helper", {
              interpolation: { escapeValue: false },
            })}
            name="profitVermietung"
            ref={register({
              required: true,
            })}
            autoFocus={true}
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
                autoFocus={true}
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
                autoFocus={true}
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
            fullWidth
            inputMode=""
            topLabel={t("profitSonstigen_label")}
            fieldHelperText={t("profitSonstigen_helper", {
              interpolation: { escapeValue: false },
            })}
            name="profitSonstigen"
            ref={register({
              required: true,
            })}
            autoFocus={true}
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
                autoFocus={true}
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
                autoFocus={true}
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
          fullWidth
          inputMode=""
          topLabel={t("profitAgriculture_label")}
          name="profitAgriculture"
          ref={register({
            required: true,
          })}
          options={[{ name: t("no"), value: "no" }]}
          autoFocus={true}
          errors={errors}
          watch={watch}
          fieldHelperText={t("profitAgriculture_helper", {
            interpolation: { escapeValue: false },
          })}
        />
        <Field
          type="picker"
          control={control}
          fullWidth
          topLabel={t("taxPrepayment_label")}
          name="taxPrepayment"
          ref={register({
            required: true,
          })}
          options={[
            { name: t("yes"), value: "yes" },
            { name: t("no"), value: "no" },
          ]}
          autoFocus={true}
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
              autoFocus={true}
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
              autoFocus={true}
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
              autoFocus={true}
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
              autoFocus={true}
              errors={errors}
              watch={watch}
            />
          </Fieldset>
        )}
      </div>
      <div className="form_submit">
        {oneOfRequired.includes("yes") ? (
          <>
            <div className="form-invalid">
              {" "}
              {/* {isEmpty(errors) ? null : t("form_invalid")} */}
            </div>
            <Button
              type="submit"
              className="body--big-bold"
              text={`${t("form_continue")}: ${comingStep.tabLabel}`}
            />
          </>
        ) : (
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
                {t("professional")}
              </Link>
              {" / "}
              <Link inline href="#profitVermietung">
                {t("renting")}
              </Link>
            </p>
          </div>
        )}
      </div>
    </form>
  );
};
export default TaxEstimate;
