import Tabs, { sampleTabData } from "components/Tabs";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useUserData } from "userData";
import Business from "./Business";
import "./form-layout.css";
import {
  formatDatasection,
  reFormatForFormData,
  sanitizeNumbers,
  wrap,
} from "./helpers";
import Personal from "./Personal";
import TaxInfo from "./TaxInfo";

const steps = sampleTabData.tabs.slice(0, 3);

const FormLayout = () => {
  const [currentStep, setCurrentStep] = useState(steps[0]);
  const { t } = useTranslation();
  const layoutRef = useRef(null);
  const { userData, setUserData } = useUserData();

  function nextStep(data, dataSection) {
    setUserData(formatDatasection(data), dataSection, true);
    setCurrentStep(
      steps[wrap(steps.indexOf(currentStep) + 1, 0, steps.length - 1)]
    );
  }

  function handleTabClick(id) {
    const currIdx = parseInt(currentStep.tabNumber, 10) - 1;
    const selectedTab = steps.find((step) => step.tabId === id);
    const selectedIdx = sanitizeNumbers(selectedTab?.tabNumber) - 1;

    if (currIdx > selectedIdx) {
      setCurrentStep(steps[wrap(selectedIdx, 0, steps.length - 1)]);
    }
  }

  useEffect(() => {
    if (steps.indexOf(currentStep) > 0)
      layoutRef.current.scrollIntoView({ behaviour: "smooth" });
  }, [layoutRef, currentStep]);

  return (
    <div ref={layoutRef} className="form-layout">
      <Tabs
        tabData={sampleTabData}
        completeTabs={steps
          .slice(0, steps.indexOf(currentStep))
          .map((s) => s.tabId)}
        activeTab={currentStep.tabId}
        onTabClick={handleTabClick}
      />
      <div className="form-container element-container">
        <div className="screen-header">
          <h2 className="screen-title">{currentStep.tabLabel}</h2>
          <p className="screen-subtitle body-small">
            {currentStep.tabSubtitle}
          </p>
        </div>
        {currentStep.tabId === "raso_tab-0" && (
          <Personal
            steps={steps}
            currentStep={currentStep}
            nextStep={nextStep}
            defaultValues={reFormatForFormData(userData.personalFields)}
          />
        )}
        {currentStep.tabId === "raso_tab-1" && (
          <Business
            steps={steps}
            currentStep={currentStep}
            nextStep={nextStep}
            defaultValues={reFormatForFormData(userData.businessFields)}
          />
        )}
        {currentStep.tabId === "raso_tab-2" && (
          <TaxInfo
            steps={steps}
            currentStep={currentStep}
            nextStep={nextStep}
            defaultValues={reFormatForFormData(userData.taxInfoFields)}
          />
        )}
      </div>
    </div>
  );
};

export default FormLayout;
