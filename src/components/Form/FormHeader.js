import React from "react";

const FormHeader = ({ currentStep }) => {
  return (
    <div className="screen-header">
      <h2 className="screen-title">{currentStep.tabLabel}</h2>
      <p className="screen-subtitle body--small">{currentStep.tabSubtitle}</p>
      {currentStep.tabHelper && (
        <p className="tab-helper body--medium">{currentStep.tabHelper}</p>
      )}
    </div>
  );
};

export default FormHeader;
