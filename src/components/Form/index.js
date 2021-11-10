import Tabs, { sampleTabData } from "components/Tabs";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { removeDuplicates } from "res/lib";
import { useUserData } from "userData";
import { useUserInteraction } from "userInteraction";
import BankAccount from "./BankAccount";
import Business from "./Business";
import "./form-layout.css";
import "./form.css";
import {
  formatDatasection,
  reFormatForFormData,
  sanitizeNumbers,
  wrap,
} from "./helpers";
import Personal from "./Personal";
import Review from "./Review";
import TaxEstimate from "./TaxEstimate";
import TaxInfo from "./TaxInfo";

const steps = sampleTabData.tabs.slice(0);

function calcNextStep(steps, currentStep) {
  return steps[
    wrap(
      steps.map((el) => el.tabId).indexOf(currentStep.tabId) + 1,
      0,
      steps.length - 1
    )
  ];
}

const FormLayout = ({ defaultSteps = steps }) => {
  const { userInteraction, setUserInteraction } = useUserInteraction();
  const [steps, setSteps] = useState(defaultSteps);
  const [currentStep, setCurrentStep] = useState(
    userInteraction.workingStep
      ? defaultSteps.find((s) => s.tabId === userInteraction.workingStep)
      : defaultSteps[0]
  );
  const { t } = useTranslation();
  const layoutRef = useRef(null);
  const { userData, setUserData } = useUserData();

  useEffect(() => {
    if (steps.indexOf(currentStep) > 0)
      layoutRef.current.scrollIntoView({ behaviour: "smooth" });
  }, [layoutRef, currentStep, steps]);

  function nextStep(data, dataSection, progress = true) {
    setUserData(formatDatasection(data), dataSection, true);
    if (!progress) {
      return;
    }
    setSteps(
      steps.map((el) =>
        el.complete === true
          ? { ...el }
          : { ...el, complete: el.tabId === dataSection }
      )
    );
    setCurrentStep(calcNextStep(steps, currentStep));

    setUserInteraction({
      stepsCompleted: removeDuplicates([
        ...steps.filter((s) => s.complete).map((s) => s.tabId),
        currentStep.tabId,
      ]),
      workingStep: calcNextStep(steps, currentStep).tabId,
    });
  }

  function handleTabClick(id) {
    const selectedTab = steps.find((el) => el.tabId === id);
    if (selectedTab.complete) {
      setCurrentStep(selectedTab);
    }
  }

  return (
    <div ref={layoutRef} className="form-layout">
      <Tabs
        tabData={{ ...sampleTabData, tabs: steps }}
        activeTab={userInteraction?.tabId || currentStep.tabId}
        onTabClick={handleTabClick}
      />
      <div className="form-container element-container">
        <div className="screen-header">
          <h2 className="screen-title">{currentStep.tabLabel}</h2>
          <p className="screen-subtitle body--small">
            {currentStep.tabSubtitle}
          </p>
          {currentStep.tabHelper && (
            <p className="tab-helper body--medium">{currentStep.tabHelper}</p>
          )}
        </div>
        {currentStep.tabId === "personalFields" && (
          <Personal
            steps={steps}
            currentStep={currentStep}
            comingStep={calcNextStep(steps, currentStep)}
            nextStep={nextStep}
            defaultValues={reFormatForFormData(userData.personalFields)}
          />
        )}
        {currentStep.tabId === "businessFields" && (
          <Business
            steps={steps}
            currentStep={currentStep}
            comingStep={calcNextStep(steps, currentStep)}
            nextStep={nextStep}
            defaultValues={reFormatForFormData(userData.businessFields)}
          />
        )}
        {currentStep.tabId === "taxInfoFields" && (
          <TaxInfo
            steps={steps}
            currentStep={currentStep}
            comingStep={calcNextStep(steps, currentStep)}
            nextStep={nextStep}
            defaultValues={reFormatForFormData(userData.taxInfoFields)}
          />
        )}
        {currentStep.tabId === "taxEstimateFields" && (
          <TaxEstimate
            steps={steps}
            currentStep={currentStep}
            comingStep={calcNextStep(steps, currentStep)}
            nextStep={nextStep}
            defaultValues={reFormatForFormData(userData.taxEstimateFields)}
          />
        )}
        {currentStep.tabId === "bankAccountFields" && (
          <BankAccount
            steps={steps}
            currentStep={currentStep}
            comingStep={calcNextStep(steps, currentStep)}
            nextStep={nextStep}
            defaultValues={reFormatForFormData(userData.bankAccountFields)}
          />
        )}
        {currentStep.tabId === "reviewFields" && (
          <Review
            steps={steps}
            currentStep={currentStep}
            comingStep={calcNextStep(steps, currentStep)}
            nextStep={nextStep}
            defaultValues={reFormatForFormData(userData.reviewFields)}
          />
        )}
      </div>
    </div>
  );
};

export default FormLayout;
