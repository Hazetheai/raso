import Button from "components/Button";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import states from "res/FormData/states.json";
import Field from "../../Field";
import Fieldset from "../Fieldset";
import { wrap } from "../helpers";

const TaxInfo = ({ steps, currentStep, nextStep, defaultValues }) => {
  const { register, handleSubmit, watch, errors, control, reset } = useForm({
    mode: "onBlur",
  });
  const onSubmit = (data) => nextStep(data, "taxInfoFields");
  const steuernummer_field_value = watch("steuernummer");

  const { t } = useTranslation();

  useEffect(() => {
    reset(defaultValues); // asynchronously reset your form values
  }, [defaultValues, reset]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     sendAmplitudeData("WEB_SIGNUP_TABVIEW", {
  //       tab: "taxInfo",
  //     });
  //   }, 500);
  // }, []);
  return (
    <form id={currentStep.tabId} onSubmit={handleSubmit(onSubmit)}>
      <div className="form">
        <Field
          type="number"
          fullWidth
          inputMode="numeric"
          name="steueridentifkationsnummer"
          //   label={t("steueridentifkationsnummer_label")}
          placeholder={t("steueridentifkationsnummer_placeholder")}
          ref={register({
            required: true,
            // maxLength: 80,
          })}
          autoFocus={true}
          errors={errors}
          watch={watch}
          fieldHelperText={`Wenn du in Deutschland geboren bist, erhältst du die Steueridentifikationsnummer nach der Geburt. Als Expat erhältst du sie bei der ersten Anmeldung in Deutschland. Es ist NICHT deine Steuernummer. Hier findest du mehr Informationen.`}
          topLabel="Deine Steueridentifikationsnummer"
        />

        <Field
          fullWidth
          type="picker"
          control={control}
          name="steuernummer"
          topLabel={`Hast du oder dein Ehepartner/eingetragener Lebenspartner bereits eine Steuernummer?`}
          options={[
            { name: "Ja", value: "yes" },
            { name: "Nein", value: "no" },
          ]}
          errors={errors}
        />

        {steuernummer_field_value === "yes" && (
          <Fieldset subfield>
            <Field
              type="number"
              inputMode="numeric"
              name="steuernummer_value"
              //   label={t("steuernummer_value_label")}
              placeholder={t("steuernummer_value_placeholder")}
              ref={register({
                required: true,
                // maxLength: 80,
              })}
              autoFocus={true}
              errors={errors}
              //   watch={watch}
              topLabel="Deine Steuernummer"
            />
            <Field
              type="select"
              name="steuernummer_state"
              //   label={t("steuernummer_state_label")}
              placeholder={t("steuernummer_state_placeholder")}
              ref={register({
                required: true,
                // maxLength: 80,
              })}
              autoFocus={true}
              errors={errors}
              //   watch={watch}
              options={states}
            />
          </Fieldset>
        )}
        <Field
          type="picker"
          control={control}
          name="singleentry"
          //   label={t("singleentry_label")}
          placeholder={t("singleentry_placeholder")}
          ref={register({
            required: true,
            // maxLength: 80,
          })}
          autoFocus={true}
          errors={errors}
          expandedHelpers={[
            {
              title: "Was ist die EÜR?",
              content: `Die Einnahmenüberschussrechnung (kurz EÜR) ist die einfachste Methode, um deinen Gewinn festzustellen. Dabei werden von deinen Einnahmen einfach die Ausgaben abgezogen. Alle Freiberufler*innen und Gewerbetreibende mit einem jährlichen Umsatz von weniger als 600.000€ und einem jährlichen Gewinn von weniger als 60.000€ können die EÜR verwenden. <br/>
              Im Moment unterstützen wir die Registrierung nur über diese Gewinnermittlungsmethode. Wenn du eine andere Methode verwenden möchtest (z.B. doppelte Buchführung), dann wende dich bitte an unseren Kundenservice.
              `,
            },
          ]}
          fieldHelperExpand
          options={[{ name: "Ja", value: "yes" }]}
          fieldHelperText={`Die Einnahmenüberschussrechnung (EÜR) ist die einfachste und üblichste Art der Gewinnermittlung für Selbständige. Deine Steuern werden entsprechend der von dir angegebenen Einnahmen und Kosten berechnet.`}
          secondFieldHelperText={`Aktuell unterstützen wir nur die Gewinnermittlung per EÜR. Kontaktiere uns bittte, wenn du eine andere Gewinnermittlungsart verwenden willst oder mehr als €600.000 Umsatz oder €60.000 Gewinn machst.`}
          topLabel="Ich will die einfache Gewinnermittlung für Selbständige nutzen (EÜR)"
        />

        <Fieldset title={"Erwartete Einnahmen aus deiner Selbständigkeit"}>
          <Field
            type="jump-date"
            name="startdate"
            label={"TT.MM.JJJJ"}
            control={control}
            ref={register({
              required: true,
              // maxLength: 80,
            })}
            fieldHelperExpand
            expandedHelpers={[
              {
                title: "Start deiner Selbständigkeit",
                content: `Du kannst deine Selbständigkeit auch rückwirkend anmelden. Gerade, wenn du schon Kosten zum Anschieben deiner Selbständigkeit hast, kann das Sinn machen. Beachte aber, dass dann evtl. Steuermeldungen nachzuholen sind.`,
              },
            ]}
            autoFocus={true}
            errors={errors}
            //   watch={watch}
            topLabel="Start deiner Selbständigkeit"
          />
          <Field
            fullWidth
            type="money"
            control={control}
            inputMode="numeric"
            name="revenue_firstYear"
            // label={t("revenue_firstYear_label")}
            placeholder={t("revenue_firstYear_placeholder")}
            ref={register({
              required: true,
              // maxLength: 80,
            })}
            autoFocus={true}
            errors={errors}
            fieldHelperText={`Bitte schätze deine Einnahmen aus deiner Selbständigkeit (ohne Gehalt, Mieteinnahmen etc.)`}
            topLabel="Deine voraussichtlichen Umsätze dieses Jahr"
          />
          <Field
            fullWidth
            type="money"
            control={control}
            inputMode="numeric"
            name="revenue_secondYear"
            // label={t("revenue_secondYear_label")}
            placeholder={t("revenue_secondYear_placeholder")}
            ref={register({
              required: true,
              // maxLength: 80,
            })}
            autoFocus={true}
            errors={errors}
            fieldHelperText={`Bitte schätze deine Einnahmen aus deiner Selbständigkeit (ohne Gehalt, Mieteinnahmen etc.)`}
            topLabel="Deine voraussichtlichen Umsätze nächstes Jahr"
          />
          <Field
            type="picker"
            control={control}
            name="chargeVAT"
            // label={t("chargeVAT_label")}
            placeholder={t("chargeVAT_placeholder")}
            ref={register({
              required: true,
            })}
            autoFocus={true}
            errors={errors}
            options={[
              { name: "Ja", value: "yes" },
              { name: "Nein", value: "no" },
            ]}
            fullWidth
            fieldHelperText={`Wenn dein Umsatz im Jahr weniger als 22.000€ beträgt, kannst du dich als Kleinunternehmer registrieren. Dann musst du keine Umsatzsteuer ausweisen. <a href="https://accountable.de/blog/kleinunternehmerin-welche-steuern-muss-ich-zahlen/"> Hier findest du mehr Infos und die Vor- und Nachteile davon. </a>`}
            topLabel="Willst du Umsatzsteuer auf deinen Rechnungen erheben"
          />
          <Field
            type="picker"
            control={control}
            name="askVATnumber"
            // label={t("askVATnumber_label")}
            placeholder={t("askVATnumber_placeholder")}
            ref={register({
              required: true,
            })}
            autoFocus={true}
            errors={errors}
            fullWidth
            options={[
              { name: "Ja", value: "yes" },
              { name: "Nein", value: "no" },
            ]}
            fieldHelperText={`Wenn du auch Kunden in anderen EU Ländern hast, kannst du hier direkt die Umsatzsteueridentifikationsnummer beantragen. Hast du nur Kunden in Deutschland, genügt deine Steuernummer. <a href="https://accountable.de/blog/selbststandig-in-deutschland-das-bedeuten-die-verschiedenen-steuernummern/" > Hier findest du alles über die Umsatzsteuer-ID.</a>`}
            topLabel="Umsatzsteuer-Identifikationsnummer beantragen - für Rechnungen an Kunden im EU-Ausland"
          />
        </Fieldset>
      </div>
      <div className="form_submit">
        <Button
          type="submit"
          className="body-big-bold"
          text={`${t("form_continue")}: ${
            steps[wrap(steps.indexOf(currentStep) + 1, 0, steps.length - 1)]
              .tabLabel
          }`}
        />
      </div>
    </form>
  );
};
export default TaxInfo;
