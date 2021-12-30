import Button from "components/Button";
import React from "react";
import { useTranslation } from "react-i18next";
import { gtagEvent } from "res/gtag";

const FormSubmit = ({ comingStep, errors, gtagButton }) => {
  const { t } = useTranslation();
  return (
    <div className="form_submit">
      <Button
        type="submit"
        text={`${t("form_continue")}: ${t(comingStep.tabLabel)}`}
        func={() => {
          gtagEvent("RASO_CLICKED_BUTTON-ITER-1", {
            button: gtagButton,
          });
        }}
      />
    </div>
  );
};

export default FormSubmit;
