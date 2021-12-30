import React from "react";
import { useTranslation } from "react-i18next";

const FormHeader = ({ currentStep }) => {
  const { t } = useTranslation();

  return (
    <div className="screen-header">
      <h2 className="screen-title">{t(currentStep.tabLabel)}</h2>
      <p className="screen-subtitle body--small">
        {t(currentStep.tabSubtitle)}
      </p>
      {currentStep.tabHelper && (
        <p className="tab-helper body--medium">{t(currentStep.tabHelper)}</p>
      )}
    </div>
  );
};

export default FormHeader;
