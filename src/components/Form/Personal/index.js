import Button from "components/Button";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import marital_status from "res/FormData/marital_status.json";
import genders from "res/FormData/gender.json";
import religion from "res/FormData/religion.json";
import { useUserData } from "userData";
import { sendAmplitudeData } from "../../../res/amplitude";
import Field from "../../Field";
import Fieldset from "../Fieldset";
import { wrap } from "../helpers";
import { emailValidator } from "../validators";

const Personal = ({ steps, currentStep, nextStep, defaultValues }) => {
  const { register, handleSubmit, watch, errors, control, reset } = useForm({
    mode: "onBlur",
    defaultValues,
  });

  const onSubmit = (data) => nextStep(data, "personalFields");
  const moved_value = watch("moved");
  const maritalstatus_value = watch("maritalstatus");
  const { t } = useTranslation();

  useEffect(() => {
    console.log(`defaultValues`, defaultValues);
    reset(defaultValues); // asynchronously reset your form values
  }, [defaultValues, reset]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     sendAmplitudeData("WEB_SIGNUP_TABVIEW", {
  //       tab: "personal",
  //     });
  //   }, 500);
  // }, []);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {console.log(`errors`, errors)}
      {console.log(`control`, control.getValues())}
      <div className="form">
        <Field
          type="text"
          name="firstname"
          floatingLabel={t("firstname_label")}
          placeholder={t("firstname_placeholder")}
          ref={register({
            required: true,
            maxLength: 80,
          })}
          errors={errors}
          watch={watch}
          topLabel="Wie is deine Vorname"
        />

        <Field
          type="text"
          name="name"
          floatingLabel={t("name_label")}
          placeholder={t("name_placeholder")}
          ref={register({
            required: true,
            maxLength: 80,
          })}
          // autoFocus={true}
          errors={errors}
          watch={watch}
          topLabel="Nachname"
        />
        <Field
          type="email"
          name="email"
          floatingLabel={t("email_address_label")}
          ref={register({
            required: true,
            validate: emailValidator,
            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          })}
          onBlur={() =>
            sendAmplitudeData("WEB_SIGNUP_FILLFIELD", {
              field: "email",
            })
          }
          topLabel="Geschäftliche E-Mail"
          errors={errors}
          watch={watch}
        />
        <Field
          type="phone"
          name="phone"
          // floatingLabel={t("phone_label")}
          topLabel={t("phone_label")}
          errors={errors}
          control={control}
        />
        <Field
          type="jump-date"
          name="birthdate"
          floatingLabel={"TT.MM.JJJJ"}
          topLabel="Geburtstag"
          errors={errors}
          control={control}
        />
        <Field
          type="select"
          name="gender"
          topLabel="Anrede"
          helperBelow
          ref={register({
            required: true,
            validate: (value) => !/choose/.test(value),
          })}
          fieldHelperText={`Aktuell bietet das Finanzamt "divers" nicht als Geschlecht an. Wir bei Accountable unterstützen alle Gender und setzen uns weiter dafür ein, dass sich etwas ändert.`}
          options={genders}
          errors={errors}
          control={control}
        />

        <Fieldset>
          <Field
            type="text"
            name="address_street"
            floatingLabel={"Strasse"}
            ref={register({
              required: true,
            })}
            errors={errors}
            control={control}
            topLabel="Adresse"
            fieldHelperExpand
            expandedHelpers={[
              {
                title:
                  "Was ist, wenn ich vor kurzem aus dem Ausland nach Deutschland gezogen bin?",
                content: `Dann kannst du auf diese Frage mit "Nein" antworten, solange du nicht aus einer anderen deutschen Gemeinde umgezogen bist.`,
                cs: true,
              },
              {
                title:
                  "Ich werde in den nächsten Wochen umziehen, welche Adresse soll ich angeben?",
                content: `Zur steuerlichen Registrierung wird deine aktuelle Adresse benötigt. Du bekommst deine Steuernummer in der Regel innerhalb von 2 bis 6 Wochen per Post zugesandt. Solltest du also in den nächsten Wochen umziehen, kannst du deine Adresse auch nach der Registrierung bei deinem Finanzamt korrigieren lassen.`,
              },
            ]}
          />
          <Field
            ref={register({
              required: true,
            })}
            type="text"
            name="address_number"
            floatingLabel={"Hausnummer"}
            errors={errors}
            control={control}
          />
          <Field
            ref={register({
              required: true,
            })}
            type="text"
            name="address_postcode"
            floatingLabel={"Postleitzahl"}
            errors={errors}
            control={control}
          />
          <Field
            ref={register({
              required: true,
            })}
            type="text"
            name="address_city"
            floatingLabel={"Stadt"}
            errors={errors}
            control={control}
          />
        </Fieldset>

        <Field
          type="select"
          name="maritalstatus"
          topLabel="Was ist dein aktueller Familienstand?"
          ref={register({
            required: true,
            validate: (value) => !/choose/.test(value),
          })}
          options={marital_status}
          errors={errors}
          control={control}
        />

        {["002", "003", "004", "005", "006", "007", "008"].includes(
          maritalstatus_value
        ) && (
          <Fieldset subfield>
            {["002", "003"].includes(maritalstatus_value) && (
              <>
                <Field
                  type="text"
                  name="partner_firstname"
                  floatingLabel={t("partner_firstname_label")}
                  placeholder={t("partner_firstname_placeholder")}
                  ref={register({
                    required: true,
                    maxLength: 80,
                  })}
                  // autoFocus={true}
                  errors={errors}
                  watch={watch}
                  topLabel="Vornahme deines Partners / deiner Partnerin"
                />
                <Field
                  type="text"
                  name="partner_name"
                  floatingLabel={t("partner_name_label")}
                  placeholder={t("partner_name_placeholder")}
                  ref={register({
                    required: true,
                    maxLength: 80,
                  })}
                  // autoFocus={true}
                  errors={errors}
                  watch={watch}
                  topLabel="Nachnahme deines Partners / deiner Partnerin"
                />
                <Field
                  type="select"
                  name="partner_gender"
                  topLabel="Geschlecht deines Partners / deiner Partnerin"
                  helperBelow
                  ref={register({
                    required: true,
                    validate: (value) => !/choose/.test(value),
                  })}
                  fieldHelperText={`Aktuell bietet das Finanzamt "divers" nicht als Geschlecht an. Wir bei Accountable unterstützen alle Gender und setzen uns weiter dafür ein, dass sich etwas ändert.`}
                  options={genders}
                  errors={errors}
                  control={control}
                />
                <Field
                  type="jump-date"
                  name="partner_birthdate"
                  topLabel="Geburtsdatum deines Partners / deiner Partnerin"
                  errors={errors}
                  control={control}
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
                  topLabel="Religionszugehörigkeit deines Partners / deiner Partnerin"
                  options={religion}
                  errors={errors}
                  control={control}
                />
              </>
            )}
            <Field
              type="jump-date"
              name="maritalstatusdate"
              topLabel="Seit"
              errors={errors}
              control={control}
            />
          </Fieldset>
        )}

        <Field
          type="select"
          name="religion"
          //floatingLabel={""}
          fullWidth
          topLabel="Religionszugehörigkeit"
          fieldHelperText={`Bist du Mitglied einer kirchensteuerpflichtigen Religionsgemeinschaft? Dann wähle diese bitte hier aus. Ansonsten wähle “nicht kirchensteuerpflichtig”.`}
          options={religion}
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
          topLabel={`Bist du in den letzten 12 Monaten aus einer anderen Gemeinde zugezogen?`}
          options={[
            { name: "Ja", value: "yes" },
            { name: "Nein", value: "no" },
          ]}
          //floatingLabel={t("tax_status_label")}
          fieldHelperText={`Diese Information hilft dem Finanzamt deine bisherigen Steuerdaten zuzuordnen.`}
          // disabled={disabled}
          errors={errors}
        />

        {moved_value === "yes" && (
          <Fieldset subfield>
            <Field
              type="text"
              name="past_address_street"
              floatingLabel={"Strasse"}
              errors={errors}
              ref={register({
                required: true,
              })}
              control={control}
              topLabel="Adresse"
            />
            <Field
              type="text"
              name="past_address_number"
              floatingLabel={"Hausnummer"}
              errors={errors}
              ref={register({
                required: true,
              })}
              control={control}
            />
            <Field
              type="text"
              name="past_address_postcode"
              floatingLabel={"Postleitzahl"}
              errors={errors}
              ref={register({
                required: true,
              })}
              control={control}
            />
            <Field
              type="text"
              name="past_address_city"
              floatingLabel={"Stadt"}
              errors={errors}
              ref={register({
                required: true,
              })}
              control={control}
            />
            <Field
              type="jump-date"
              name="movingdate"
              topLabel="Umzugsdatum"
              errors={errors}
              ref={register({
                required: true,
              })}
              control={control}
            />
          </Fieldset>
        )}

        <Field
          type="picker"
          control={control}
          name="want_tips"
          fullWidth
          options={[
            {
              name: "Ich will Hilfe beim Ausfüllen des Fragebogens und Steuer-Tipps von Accountable erhalten",
              value: true,
            },
          ]}
          errors={errors}
        />
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
export default Personal;
