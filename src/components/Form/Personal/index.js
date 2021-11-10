import Button from "components/Button";
import { nYearsFromNow } from "components/Field/helpers";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import genders from "res/FormData/gender.json";
import marital_status from "res/FormData/marital_status.json";
import religion from "res/FormData/religion.json";
import { isEmpty } from "res/lib";
import { useUserInteraction } from "userInteraction";
import { sendAmplitudeData } from "../../../res/amplitude";
import Field from "../../Field";
import Fieldset from "../Fieldset";
import { emailValidator, validators } from "../validators";

const Personal = ({
  steps,
  currentStep,
  nextStep,
  defaultValues,
  onFillStart,
  comingStep,
}) => {
  const { register, handleSubmit, watch, errors, control, reset, formState } =
    useForm({
      mode: "onBlur",
      defaultValues,
    });
  const { userInteraction, setUserInteraction } = useUserInteraction();
  const onSubmit = (data) => nextStep(data, "personalFields");
  const moved_value = watch("moved");
  const maritalstatus_value = watch("maritalstatus");
  const { t } = useTranslation();

  useEffect(() => {
    reset(defaultValues); // asynchronously reset your form values
  }, [reset, defaultValues]);

  useEffect(() => {
    if (formState.isDirty) {
      // console.log(`formState`, formState);
      setUserInteraction({ startedFilling: true });
    }
  }, [formState.isDirty, setUserInteraction]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     sendAmplitudeData("WEB_SIGNUP_TABVIEW", {
  //       tab: "personal",
  //     });
  //   }, 500);
  // }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* {console.log(`userInteraction`, userInteraction)} */}
      <div className="form">
        <Field
          type="text"
          name="firstname"
          // floatingLabel={t("firstname_label")}
          placeholder={t("firstname_placeholder")}
          ref={register({
            required: true,
            maxLength: 80,
            pattern: validators.firstname,
          })}
          errors={errors}
          watch={watch}
          topLabel="Wie is deine Vorname"
        />

        <Field
          type="text"
          name="name"
          // floatingLabel={t("name_label")}
          placeholder={t("name_placeholder")}
          ref={register({
            required: true,
            maxLength: 80,
            pattern: validators.name,
          })}
          // autoFocus={true}
          errors={errors}
          watch={watch}
          topLabel="Nachname"
        />
        <Field
          type="email"
          name="email"
          // floatingLabel={t("email_address_label")}
          ref={register({
            required: true,
            validate: emailValidator,
            pattern: validators.email,
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
          dateMinMax={{
            dateMin: nYearsFromNow(90, "before"),
            dateMax: nYearsFromNow(18, "before"),
          }}
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
              pattern: validators.address_street,
            })}
            watch={watch}
            errors={errors}
            control={control}
            topLabel="Adresse"
            expandedHelpers={[
              {
                title:
                  "Was ist, wenn ich vor kurzem aus dem Ausland nach Deutschland gezogen bin?",
                content: `Antworte mit "Nein", solange du nicht aus einer anderen deutschen Gemeinde umgezogen bist.`,
              },
              {
                title:
                  "Ich werde in den nächsten Wochen umziehen, welche Adresse soll ich angeben?",
                content: `Deine Steuernummer erhältst du per Post. Du kannst deine Adresse aber auch nach der Registrierung bei deinem Finanzamt korrigieren lassen.`,
                cs: true,
              },
            ]}
          />
          <Field
            ref={register({
              required: true,
              pattern: validators.address_number,
            })}
            type="text"
            name="address_number"
            floatingLabel={"Hausnummer"}
            errors={errors}
            control={control}
            watch={watch}
          />
          <Field
            ref={register({
              required: true,
              pattern: validators.address_postcode,
            })}
            type="text"
            name="address_postcode"
            floatingLabel={"Postleitzahl"}
            errors={errors}
            control={control}
            watch={watch}
          />
          <Field
            ref={register({
              required: true,
              pattern: validators.address_city,
            })}
            type="text"
            name="address_city"
            floatingLabel={"Stadt"}
            errors={errors}
            control={control}
            watch={watch}
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
          watch={watch}
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
                    pattern: validators.partner_firstname,
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
                    pattern: validators.partner_name,
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
                  floatingLabel="TT.MM.JJJJ"
                  dateMinMax={{
                    dateMin: nYearsFromNow(90, "before"),
                    dateMax: nYearsFromNow(18, "before"),
                  }}
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
              watch={watch}
              name="past_address_street"
              floatingLabel={"Strasse"}
              errors={errors}
              ref={register({
                required: true,
                pattern: validators.past_address_street,
              })}
              control={control}
              topLabel="Adresse"
            />
            <Field
              type="text"
              watch={watch}
              name="past_address_number"
              floatingLabel={"Hausnummer"}
              errors={errors}
              ref={register({
                required: true,
                pattern: validators.past_address_number,
              })}
              control={control}
            />
            <Field
              type="text"
              watch={watch}
              name="past_address_postcode"
              floatingLabel={"Postleitzahl"}
              errors={errors}
              ref={register({
                required: true,
                pattern: validators.past_address_postcode,
              })}
              control={control}
            />
            <Field
              type="text"
              watch={watch}
              name="past_address_city"
              floatingLabel={"Stadt"}
              errors={errors}
              ref={register({
                required: true,
                pattern: validators.past_address_city,
              })}
              control={control}
            />
            <Field
              type="jump-date"
              name="movingdate"
              topLabel="Umzugsdatum"
              floatingLabel="TT.MM.JJJJ"
              errors={errors}
              ref={register({
                required: true,
              })}
              control={control}
            />
          </Fieldset>
        )}

        <Field
          type="checkbox"
          control={control}
          name="optin"
          fullWidth
          options={[
            {
              name: "Ich will Hilfe beim Ausfüllen des Fragebogens und Steuer-Tipps von Accountable erhalten",
              value: true,
              required: false,
              default: false,
            },
          ]}
          errors={errors}
        />
      </div>
      <div className="form_submit">
        <div className="form-invalid">
          {" "}
          {isEmpty(errors) ? null : t("form_invalid")}
        </div>
        <Button
          type="submit"
          // form={currentStep.tabId}
          // func={nextStep}
          className="body--big-bold"
          text={`${t("form_continue")}: ${comingStep.tabLabel}`}
        />
      </div>
    </form>
  );
};
export default Personal;
