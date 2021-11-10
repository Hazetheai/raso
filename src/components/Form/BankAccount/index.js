import Button from "components/Button";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import bankAccountHolders from "res/FormData/bankAccountHolders.json";
import { isEmpty } from "res/lib";
import Field from "../../Field";
import Fieldset from "../Fieldset";
import { isValidIBANNumber } from "../validators";

const BankAccount = ({
  steps,
  currentStep,
  nextStep,
  defaultValues,
  comingStep,
}) => {
  const { register, handleSubmit, watch, errors, control, reset } = useForm({
    mode: "onBlur",
  });
  const onSubmit = (data) => nextStep(data, "bankAccountFields");
  const showBusinessBankAccount_field_value = watch("showBusinessBankAccount");
  const showPersonalBankAccount_field_value = watch("showPersonalBankAccount");

  const { t } = useTranslation();

  useEffect(() => {
    reset(defaultValues); // asynchronously reset your form values
  }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     sendAmplitudeData("WEB_SIGNUP_TABVIEW", {
  //       tab: "bankAccount",
  //     });
  //   }, 500);
  // }, []);
  return (
    <form id={currentStep.tabId} onSubmit={handleSubmit(onSubmit)}>
      <div className="form">
        <Fieldset title="Geschäftliches Bankkonto">
          <Field
            type="picker"
            control={control}
            inputMode=""
            topLabel="Willst du dem Finanzamt dein geschäftliches Bankkonto mitteilen (optional)?"
            name="showBusinessBankAccount"
            ref={register({})}
            autoFocus={true}
            errors={errors}
            watch={watch}
            fieldHelperText={``}
            options={[
              { name: "Ja", value: "yes" },
              { name: "Nein", value: "no" },
            ]}
          />

          {showBusinessBankAccount_field_value === "yes" && (
            <Fieldset subfield>
              <Field
                type="text"
                control={control}
                topLabel="IBAN deines geschäftlichen Bankkontos"
                name="businessIban"
                ref={register({
                  required: true,
                  validate: (value) =>
                    isValidIBANNumber(value) === 1 ||
                    "This IBAN Number is not valid",
                })}
                autoFocus={true}
                errors={errors}
                watch={watch}
              />
              <Field
                type="text"
                control={control}
                topLabel="Kontoinhaber deines geschäftlichen Bankkontos"
                name="businessBankAccountOwner"
                ref={register({
                  required: true,
                })}
                autoFocus={true}
                errors={errors}
                watch={watch}
              />
              <Field
                type="select"
                control={control}
                topLabel=""
                name="businessBankAccountOwnerCategory"
                ref={register({
                  required: true,
                })}
                autoFocus={true}
                options={bankAccountHolders}
                errors={errors}
                watch={watch}
              />
            </Fieldset>
          )}
        </Fieldset>
        <Fieldset title="Privates Bankkonto">
          <Field
            type="picker"
            control={control}
            inputMode=""
            topLabel="Willst du dem Finanzamt dein privates Bankkonto mitteilen (optional)?"
            name="showPersonalBankAccount"
            ref={register({})}
            autoFocus={true}
            errors={errors}
            watch={watch}
            fieldHelperText={``}
            options={[
              { name: "Ja", value: "yes" },
              { name: "Nein", value: "no" },
            ]}
          />

          {showPersonalBankAccount_field_value === "yes" && (
            <Fieldset subfield>
              <Field
                type="text"
                control={control}
                topLabel="IBAN deines privaten Bankkontos"
                name="privateIban"
                ref={register({
                  required: true,
                  validate: (value) =>
                    isValidIBANNumber(value) === 1 ||
                    "This IBAN Number is not valid",
                })}
                fieldHelperText="Diese Informationen werden vom Finanzamt für Steuerrückerstattungen genutzt. Deine Daten werden ausschließlich an dein Finanzamt übermittelt."
                autoFocus={true}
                errors={errors}
                watch={watch}
              />
              <Field
                type="text"
                control={control}
                topLabel="Kontoinhaber deines geschäftlichen Bankkontos"
                name="privateBankAccountOwner"
                ref={register({
                  required: true,
                })}
                autoFocus={true}
                errors={errors}
                watch={watch}
              />
              <Field
                type="select"
                control={control}
                topLabel=""
                name="privateBankAccountOwnerCategory"
                ref={register({
                  required: true,
                })}
                autoFocus={true}
                options={bankAccountHolders}
                errors={errors}
                watch={watch}
              />
            </Fieldset>
          )}
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
export default BankAccount;
