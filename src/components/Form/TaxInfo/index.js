import Button from "components/Button";
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
          //   floatingLabel={t("steueridentifkationsnummer_label")}
          placeholder={t("steueridentifkationsnummer_placeholder")}
          ref={register({
            required: true,
            pattern: validators.steueridentifkationsnummer,
            validate: taxIdValidator,
          })}
          autoFocus={true}
          errors={errors}
          watch={watch}
          fieldHelperText={`Wenn du in Deutschland geboren bist, erhältst du die Steueridentifikationsnummer nach der Geburt. Als Expat erhältst du sie bei der ersten Anmeldung in Deutschland. Es ist NICHT deine Steuernummer. <a href="https://accountable.de/blog/selbststandig-in-deutschland-das-bedeuten-die-verschiedenen-steuernummern/" target="_blank">  Hier findest du mehr Informationen.</a>`}
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
              //   floatingLabel={t("steuernummer_value_label")}
              placeholder={t("steuernummer_value_placeholder")}
              ref={register({
                required: true,
                pattern: validators.steuernummer_value,
              })}
              autoFocus={true}
              errors={errors}
              //   watch={watch}
              topLabel="Deine Steuernummer"
            />
            <Field
              type="select"
              name="steuernummer_state"
              //   floatingLabel={t("steuernummer_state_label")}
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
          //   floatingLabel={t("singleentry_label")}
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
              content: `Die Einnahmenüberschussrechnung (EÜR) ist die einfachste Methode, um deinen Gewinn festzustellen. Alle Freiberufler*innen und Gewerbetreibende mit einem jährlichen Umsatz von weniger als 600.000€ und einem jährlichen Gewinn von weniger als 60.000€ können die EÜR verwenden. <br/> <br/>
              Im Moment unterstützen wir die Registrierung nur über diese Gewinnermittlungsmethode. Wenn du eine andere Methode verwenden möchtest (z.B. doppelte Buchführung), wende dich an unseren Kundenservice.
              `,
            },
          ]}
          options={[{ name: "Ja", value: "yes" }]}
          fieldHelperText={`Die Einnahmenüberschussrechnung (EÜR) ist die einfachste und üblichste Art der Gewinnermittlung für Selbständige. Deine Steuern werden entsprechend der von dir angegebenen Einnahmen und Kosten berechnet.`}
          secondFieldHelperText={`Aktuell unterstützen wir nur die Gewinnermittlung per EÜR. Kontaktiere uns bittte, wenn du eine andere Gewinnermittlungsart verwenden willst oder mehr als €600.000 Umsatz oder €60.000 Gewinn machst.`}
          topLabel="Ich will die einfache Gewinnermittlung für Selbständige nutzen (EÜR)"
        />

        <Fieldset title={"Erwartete Einnahmen aus deiner Selbständigkeit"}>
          <Field
            type="jump-date"
            name="startdate"
            floatingLabel={"TT.MM.JJJJ"}
            control={control}
            ref={register({
              required: true,
              // maxLength: 80,
            })}
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
            // floatingLabel={t("revenue_firstYear_label")}
            placeholder={t("revenue_firstYear_placeholder")}
            moneyRules={{ validate: (value) => validateKUN("first") }}
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
            // floatingLabel={t("revenue_secondYear_label")}
            placeholder={t("revenue_secondYear_placeholder")}
            moneyRules={{ validate: (value) => validateKUN("second") }}
            autoFocus={true}
            errors={errors}
            fieldHelperText={`Bitte schätze deine Einnahmen aus deiner Selbständigkeit (ohne Gehalt, Mieteinnahmen etc.)`}
            topLabel="Deine voraussichtlichen Umsätze nächstes Jahr"
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
              { name: "Ja", value: "yes" },
              { name: "Nein", value: "no" },
            ]}
            fullWidth
            fieldHelperText={`Wenn dein Umsatz im Jahr weniger als 22.000€ beträgt, kannst du dich als Kleinunternehmer registrieren. Dann musst du keine Umsatzsteuer ausweisen. <a href="https://accountable.de/blog/kleinunternehmerin-welche-steuern-muss-ich-zahlen/" target=_blank> Hier findest du mehr Infos und die Vor- und Nachteile davon. </a>`}
            topLabel="Willst du Umsatzsteuer auf deinen Rechnungen erheben"
            expandedHelpers={[
              {
                title: "Kann ich mich als Kleinunternehmer*in registrieren?",
                content: `Die <a href="https://www.accountable.de/blog/kleinunternehmer-guide-alles-rund-um-die-kleinunternehmerregelung/" target="_blank"> Kleinunternehmerregelung </a> befreit dich von der Umsatzsteuer, wenn dein Umsatz unter 22.000€ im ersten Jahr und unter 50.000€ im Folgejahr liegt (Stand 2021). <br/><br/>
                Wenn du mitten im Jahr mit der Selbständigkeit anfängst, musst du deine Umsätze auf das ganze Jahr hochrechnen. Bei Registrierung am 1. Juli z.B. darf dein jährlicher Umsatz höchstens 11.000€ sein.
                `,
              },
              {
                title: "Ist die Kleinunternehmerregelung immer vorteilhaft?",
                content: `Die Befreiung von der Umsatzsteuer ist vorteilhaft, wenn du nur Privatkunden/-kundinnen hast und keine hohen Investitionen hast.  <br/><br/>
                Wenn du an Unternehmen verkaufst oder hohe Investitionen planst, dann lohnt sich diese Regelung meistens nicht. Als Kleinunternehmer*in kannst du nämlich die gezahlte Umsatzsteuer aus deinen Ausgaben nicht als Vorsteuer zurückbekommen.
                `,
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
              { name: "Ja", value: "yes" },
              { name: "Nein", value: "no" },
            ]}
            fieldHelperText={`Wenn du auch Kunden in anderen EU Ländern hast, kannst du hier direkt die Umsatzsteueridentifikationsnummer beantragen. Hast du nur Kunden in Deutschland, genügt deine Steuernummer. <a href="https://accountable.de/blog/selbststandig-in-deutschland-das-bedeuten-die-verschiedenen-steuernummern/" target="_blank" > Hier findest du alles über die Umsatzsteuer-ID.</a>`}
            topLabel="Umsatzsteuer-Identifikationsnummer beantragen - für Rechnungen an Kunden im EU-Ausland"
            expandedHelpers={[
              {
                title: "Brauche ich eine USt-ID?",
                content: `Nur wenn du Geschäfte mit Unternehmen aus der EU hast, musst du eine USt-ID beantragen. Kleinunternehmer*innen brauchen grundsätzlich keine USt-ID. <br/><br/>
                Wenn du nur an Privatpersonen in der EU verkaufst oder nur deutsche Kunden/Kundinnen hast, brauchst du auch keine.
                `,
              },
            ]}
          />
        </Fieldset>
      </div>
      <div className="form_submit">
        <div className="form-invalid">
          {" "}
          {isEmpty(errors) ? null : t("form_invalid")}
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
