import Button from "components/Button";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import bankAccountHolders_en from "res/FormData/de/bankAccountHolders.json";
import bankAccountHolders_de from "res/FormData/en/bankAccountHolders.json";
import { useUserInteraction } from "userInteraction";
import Field from "../../Field";
import Fieldset from "../Fieldset";
import { useLocalFormVal } from "../../hooks/useLocalState";
import { isValidIBANNumber } from "../validators";

const BankAccount = ({ currentStep, nextStep, comingStep }) => {
  const { userInteraction, setUserInteraction } = useUserInteraction();
  const {
    register,
    handleSubmit,
    watch,
    errors,
    control,
    reset,
    formState,
    getValues,
  } = useForm({
    mode: userInteraction.stepsCompleted.includes("personalFields")
      ? "onChange"
      : "onBlur",
  });

  const onSubmit = (data) => nextStep(data, "bankAccountFields");
  const { t, i18n } = useTranslation();

  const showBusinessBankAccount_field_value = watch("showBusinessBankAccount");
  const showPersonalBankAccount_field_value = watch("showPersonalBankAccount");

  useEffect(() => {
    if (
      formState.isDirty &&
      !userInteraction.touchedScreens.includes(currentStep.tabId)
    ) {
      setUserInteraction({
        startedFilling: true,
        touchedScreens: [
          ...userInteraction.touchedScreens,
          "bankAccountFields",
        ],
      });
    }
  }, [formState.isDirty, setUserInteraction]);

  const localFormVals = getValues();
  useLocalFormVal({
    key: "bankAccountFields",
    reset,
    localFormVals,
    errors,
  });

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
        <Fieldset title={t("bank_account_business_fieldset_title")}>
          <Field
            type="picker"
            control={control}
            topLabel={t("showBusinessBankAccount_label")}
            name="showBusinessBankAccount"
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

          {showBusinessBankAccount_field_value === "yes" && (
            <Fieldset subfield>
              <Field
                type="text"
                control={control}
                topLabel={t("businessIban_label")}
                name="businessIban"
                ref={register({
                  required: true,
                  validate: (value) =>
                    isValidIBANNumber(value) === 1 || t("iban_invalid"),
                })}
                errors={errors}
                watch={watch}
              />
              <Field
                type="text"
                control={control}
                topLabel={t("businessBankAccountOwner_label")}
                name="businessBankAccountOwner"
                ref={register({
                  required: true,
                })}
                errors={errors}
                watch={watch}
              />
              <Field
                type="select"
                control={control}
                name="businessBankAccountOwnerCategory"
                ref={register({
                  required: true,
                })}
                options={
                  i18n.language === "de"
                    ? bankAccountHolders_de
                    : bankAccountHolders_en
                }
                errors={errors}
                watch={watch}
              />
            </Fieldset>
          )}
        </Fieldset>
        <Fieldset title={t("bank_account_private_fieldset_title")}>
          <Field
            type="picker"
            control={control}
            topLabel={t("showPrivateBankAccount_label")}
            name="showPersonalBankAccount"
            ref={register({})}
            errors={errors}
            watch={watch}
            options={[
              { name: t("yes"), value: "yes" },
              { name: t("no"), value: "no" },
            ]}
          />

          {showPersonalBankAccount_field_value === "yes" && (
            <Fieldset subfield>
              <Field
                type="text"
                control={control}
                topLabel={t("privateIban_label")}
                name="privateIban"
                ref={register({
                  required: true,
                  validate: (value) =>
                    isValidIBANNumber(value) === 1 || t("iban_invalid"),
                })}
                fieldHelperText={t("privateBankAccountOwner_label")}
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
                options={
                  i18n.language === "de"
                    ? bankAccountHolders_de
                    : bankAccountHolders_en
                }
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
          {/* {isEmpty(errors) ? null : t("form_invalid")} */}
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
