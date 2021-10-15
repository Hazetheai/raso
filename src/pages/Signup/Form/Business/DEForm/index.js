import React, { Fragment } from "react";
import Field from "../../../../../components/Field";
import { useTranslation } from "react-i18next";
import { useUserData } from "userData";

const DEForm = ({ disabled, watch, register, errors, control }) => {
  const VATType = watch("VATType");
  const { t } = useTranslation();
  const { userData } = useUserData();
  return (
    <Fragment>
      <Field
        type="picker"
        control={control}
        name="accountType"
        options={[
          { name: "Freiberufler", value: "freiberufler_principal_vat" },
          { name: "Gewerbetreibender", value: "gewerbetreibender_principal" },
        ]}
        label={t("tax_status_label")}
        disabled={disabled}
        errors={errors}
      />
      <Field
        type="picker"
        control={control}
        name="VATType"
        options={[
          { name: t("ust_status_subject_to_vat"), value: "subjectToVAT" },
          { name: t("ust_status_exempt_from_vat"), value: "noVAT" },
        ]}
        label={t("ust_status_label")}
        disabled={disabled}
        errors={errors}
      />
      {VATType === "subjectToVAT" && (
        <Field
          type="picker"
          control={control}
          name="VATReturnFrequency"
          options={[
            { name: t("monthly_vat"), value: "monthly" },
            { name: t("quarterly_vat"), value: "quarterly" },
            { name: t("yearly_vat"), value: "yearly" },
          ]}
          label={t("ust_frequency_label")}
          disabled={disabled}
          errors={errors}
        />
      )}
      {VATType === "noVAT" && (
        <Field
          type="picker"
          control={control}
          name="noVATStatus"
          options={[
            { name: t("franchisee_yes"), value: "franchisee" },
            { name: t("franchisee_no"), value: "exempt" },
          ]}
          label={t("franchisee_label")}
          disabled={disabled}
          errors={errors}
        />
      )}
      <Field
        type="text"
        name="promocode"
        label={t("promocode_label")}
        ref={register({
          maxLength: 80,
        })}
        errors={errors}
        disabled={userData.promocode || disabled}
        value={userData.promocode}
        watch={watch}
        autoFocus
      />
    </Fragment>
  );
};
export default DEForm;
