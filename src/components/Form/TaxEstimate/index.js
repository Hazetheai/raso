import Button from "components/Button";
import Link from "components/Link";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { isEmpty } from "res/lib";
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
      console.log(window.location.hash);
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
        <Fieldset title="Voraussichtlicher Gewinn aus deiner Selbständigkeit">
          {/* Income Field - profitFreiberufler */}
          <Field
            type="picker"
            control={control}
            inputMode=""
            topLabel="Erwartest du Gewinne aus Selbständigkeit?"
            name="profitFreiberufler"
            ref={register({
              required: true,
            })}
            pickerRules={pickerRules}
            autoFocus={true}
            errors={errors}
            watch={watch}
            fieldHelperText={``}
            options={[
              { name: "Ja", value: "yes" },
              { name: "Nein", value: "no" },
            ]}
            expandedHelpers={[
              {
                title:
                  "Was ist der Unterschied zwischen selbständigen und gewerblichen Tätigkeiten?",
                content: `Zu den selbständigen Tätigkeiten gehören: <br/>
                - <a href="https://www.accountable.de/blog/freiberufler-oder-gewerbe/" target="_blank"> freiberufliche Tätigkeiten </a> <br/>
                - staatliche Lotterieeinnahmen <br/>
                - sonstige selbständige Arbeiten (z.B. Vermögensverwaltung)<br/><br/>
                Alle anderen Tätigkeiten sind in der Regel gewerblich. Mehr Infos dazu auf <a href="https://www.accountable.de/blog/freiberufler-oder-gewerbe/" target="_blank"> unseren Blog.</a>
                `,
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
                topLabel="Erstes Geschäftsjahr (2021)"
                name="profitFreiberuflerFirstYear"
                ref={register({
                  required: true,
                  pattern: validators.profitFreiberuflerFirstYear,
                })}
                autoFocus={true}
                errors={errors}
                watch={watch}
                fieldHelperText={`Schätze den Gewinn so gut du kannst. Dein Gewinn ist dein Umsatz nach Abzug aller geschäftlichen Kosten (z.B. Software, Reisekosten, Hilfsmittel etc.)`}
              />
              <Field
                type="money"
                control={control}
                inputMode="numeric"
                topLabel="Zweites Geschäftsjahr (2021)"
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
            inputMode=""
            topLabel="Erwartest du Gewinne aus Gewerbetrieb?"
            name="profitGewerbetreibender"
            ref={register({
              required: true,
            })}
            autoFocus={true}
            errors={errors}
            watch={watch}
            fieldHelperText={``}
            options={[
              { name: "Ja", value: "yes" },
              { name: "Nein", value: "no" },
            ]}
          />

          {profitGewerbetreibender_field_value === "yes" && (
            <Fieldset subfield>
              <Field
                type="money"
                control={control}
                inputMode="numeric"
                topLabel="Erstes Geschäftsjahr (2021)"
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
                fieldHelperText={`Schätze den Gewinn so gut du kannst. Dein Gewinn ist dein Umsatz nach Abzug aller geschäftlichen Kosten (z.B. Software, Reisekosten, Hilfsmittel etc.)`}
                topLabel="Zweites Geschäftsjahr (2021)"
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
        <Fieldset title={"Andere Einkommensquellen"}>
          {/* Income Field - profitNichtselbstandiger */}
          <Field
            type="picker"
            control={control}
            fullWidth
            topLabel="Erwartete Gehalts- oder Lohnzahlungen (Nichtselbständige Arbeit)"
            fieldHelperText={`Wenn du ein Lohn oder Gehalt bekommst, trage hier bitte das Bruttojahresgehalt vor allen Abzügen ein.`}
            name="profitNichtselbstandiger"
            ref={register({
              required: true,
            })}
            autoFocus={true}
            errors={errors}
            watch={watch}
            options={[
              { name: "Ja", value: "yes" },
              { name: "Nein", value: "no" },
            ]}
          />

          {profitNichtselbstandiger_field_value === "yes" && (
            <Fieldset subfield>
              <Field
                type="money"
                control={control}
                inputMode="numeric"
                topLabel="Erstes Geschäftsjahr (2021)"
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
                topLabel="Zweites Geschäftsjahr (2021)"
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
            topLabel="Erwartete Gehalts- oder Lohnzahlungen (Nichtselbständige Arbeit)"
            fieldHelperText={`Einkommen aus Aktien, Fonds oder Zinsen (keine Mieteinnahmen)`}
            name="profitKapitalvermogen"
            ref={register({
              required: true,
            })}
            autoFocus={true}
            errors={errors}
            watch={watch}
            options={[
              { name: "Ja", value: "yes" },
              { name: "Nein", value: "no" },
            ]}
          />

          {profitKapitalvermogen_field_value === "yes" && (
            <Fieldset subfield>
              <Field
                type="money"
                control={control}
                inputMode="numeric"
                topLabel="Erstes Geschäftsjahr (2021)"
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
                topLabel="Zweites Geschäftsjahr (2021)"
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
            topLabel="Erwartest du Einkommen aus Vermietung oder Verpachtung?"
            fieldHelperText={`Einkommen aus Vermietung und Verpachtung`}
            name="profitVermietung"
            ref={register({
              required: true,
            })}
            autoFocus={true}
            errors={errors}
            watch={watch}
            options={[
              { name: "Ja", value: "yes" },
              { name: "Nein", value: "no" },
            ]}
          />

          {profitVermietung_field_value === "yes" && (
            <Fieldset subfield>
              <Field
                type="money"
                control={control}
                inputMode="numeric"
                topLabel="Erstes Geschäftsjahr (2021)"
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
                topLabel="Zweites Geschäftsjahr (2021)"
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
            topLabel="Erwartest du sonstige Einkünfte?"
            fieldHelperText={`Einkommen aus anderen Quellen (z.B. Rente)`}
            name="profitSonstigen"
            ref={register({
              required: true,
            })}
            autoFocus={true}
            errors={errors}
            watch={watch}
            options={[
              { name: "Ja", value: "yes" },
              { name: "Nein", value: "no" },
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
          topLabel="Hast du Einkommen aus Land- und Forstwirtschaft?"
          name="profitAgriculture"
          ref={register({
            required: true,
          })}
          options={[{ name: "Nein", value: "no" }]}
          autoFocus={true}
          errors={errors}
          watch={watch}
          fieldHelperText={`Aktuell unterstützen wir die Online-Meldung beim Finanzamt nicht, wenn du Einkommen aus Land- und Forstwirtschaft hast. <a href="https://accountable.de/steuernummer-online-beantragen/#" target="_blank"> Kontaktiere uns, wenn das bei dir der Fall ist.</a>`}
        />
        <Field
          type="picker"
          control={control}
          fullWidth
          inputMode=""
          topLabel="Willst du deine Steuerabzüge schätzen, um deine Steuer-Vorauszahlungen zu verringern?"
          name="taxPrepayment"
          ref={register({
            required: true,
          })}
          options={[
            { name: "Ja", value: "yes" },
            { name: "Nein", value: "no" },
          ]}
          autoFocus={true}
          errors={errors}
          watch={watch}
          fieldHelperText={`Du kannst versuchen deine Sonderausgaben und Steuerabzugsbeträge anhand deiner letzten Steuererklärung zu schätzen. Wenn du dir nicht sicher bist, antworte einfach mit “Nein”. Dadurch hast du evtl. höhere Steuervorauszahlungen, du kannst die Steuerabzüge aber trotzdem am Jahresende geltend machen und bist so auf der sicheren Seite.`}
        />
      </div>
      <div className="form_submit">
        {oneOfRequired.includes("yes") ? (
          <>
            <div className="form-invalid">
              {" "}
              {isEmpty(errors) ? null : t("form_invalid")}
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
              Eine dieser Einkommensarten muss ausgefüllt werden: <br />{" "}
            </h4>
            <p>
              <Link inline href="#profitFreiberufler">
                Freiberufler
              </Link>
              {" / "}
              <Link inline href="#profitGewerbetreibender">
                Gewerbtreibende
              </Link>
              {" / "}
              <Link inline href="#profitVermietung">
                Vermietung und Verpachtung
              </Link>
            </p>
          </div>
        )}
      </div>
    </form>
  );
};
export default TaxEstimate;
