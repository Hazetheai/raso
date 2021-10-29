import Button from "components/Button";
import FormField from "components/Field";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { sendAmplitudeData } from "../../../res/amplitude";
import Fieldset from "../Fieldset";
import { wrap } from "../helpers";

const Business = ({ steps, currentStep, nextStep, defaultValues }) => {
  const { handleSubmit, watch, register, errors, control, reset } = useForm({
    mode: "onBlur",
  });

  const onSubmit = (data) => nextStep(data, "businessFields");
  const officeaddress_value = watch("officeaddress");
  const { t } = useTranslation();

  useEffect(() => {
    reset(defaultValues); // asynchronously reset your form values
  }, [defaultValues, reset]);

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
          topLabel={"Beruf"}
          fieldHelperText={
            "Auf Basis dieser Informationen entscheidet das Finanzamt, ob du als Freiberufler*in oder Gewerbetreibende*r eingestuft wirst und welche Steuern du zahlen musst. Hier findest du mehr Informationen dazu."
          }
          fieldHelperExpand
          expandedHelpers={[
            {
              title: "Was sollte ich bei der Tätigkeitsbeschreibung beachten?",
              content: `Wichtig ist, dass du eine kurze aber genaue Angabe deiner Tätigkeit machst. Z.B. solltest du nicht nur "Design" angeben, sondern etwas wie "Erstellung von Designs für Webseiten". <br/>
              Du kannst auch mehrere Tätigkeiten anmelden. Dabei solltest du aber darauf achten, dass die Tätigkeiten möglichst zusammenpassen und deine Haupttätigkeit erkennbar ist. Als Webdesigner*in kannst du z.B. auch Online-Werbung oder Marketing machen.<br/>
              Wenn du während deiner Selbständigkeit neue Tätigkeiten für dich entdeckst, musst du diese an das Finanzamt nachmelden. Für anmeldepflichtige Berufe (z.B. Handwerker*in) musst du zusätzlich spezielle Anträge stellen.
              `,
            },
          ]}
          ref={register({
            maxLength: 200,
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
          topLabel={`Hast du eine abweichende geschäftliche Adresse?`}
          options={[
            { name: "Ja", value: "yes" },
            { name: "Nein", value: "no" },
          ]}
          errors={errors}
        />

        {officeaddress_value === "yes" && (
          <Fieldset subfield>
            <FormField
              type="text"
              ref={register({
                required: true,
              })}
              name="office_address_street"
              label={"Strasse"}
              errors={errors}
              control={control}
              topLabel="Adresse"
            />
            <FormField
              type="text"
              ref={register({
                required: true,
              })}
              name="office_address_number"
              label={"Hausnummer"}
              errors={errors}
              control={control}
            />
            <FormField
              type="text"
              ref={register({
                required: true,
              })}
              name="office_address_city"
              label={"Postleitzahl"}
              errors={errors}
              control={control}
            />
            <FormField
              type="text"
              ref={register({
                required: true,
              })}
              name="office_address_postcode"
              label={"Stadt"}
              errors={errors}
              control={control}
            />
          </Fieldset>
        )}

        <FormField
          type="picker"
          control={control}
          name="previousbusiness"
          fullWidth
          topLabel={`Hast du in den letzten 5 Jahren ein Gewerbe betrieben, warst als Selbständige*r tätig oder hast Anteile an einer Gesellschaft (von mind. 1%) besessen?`}
          options={[
            { name: "Ja", value: "yes" },
            { name: "Nein", value: "no" },
          ]}
          errors={errors}
        />

        {/* {error && <span className="form_error">{t("form_error")}</span>} */}
      </div>
      <div className="form_submit">
        <Button
          type="submit"
          // form={currentStep.tabId}
          // func={nextStep}
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
export default Business;
