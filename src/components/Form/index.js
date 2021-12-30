import ManageTaxes from "components/Form/ManageTaxes";
import Tabs from "components/Tabs";
import { useUserData } from "data-layer/userData";
import { useUserInteraction } from "data-layer/userInteraction";
import { isEqual } from "lodash";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { removeDuplicates } from "res/lib";
import BankAccount from "./BankAccount";
import Business from "./Business";
import "./form-layout.css";
import "./form.css";
import {
  formatDatasection,
  reFormatForFormData,
} from "./helper-functions/data-shaping";
import { calcNextStep } from "./helper-functions/next-step";
import Personal from "./Personal";
import Review from "./Review";
import TaxEstimate from "./TaxEstimate";
import TaxInfo from "./TaxInfo";

const Form = ({ tabData }) => {
  const { t, i18n } = useTranslation();
  const { userInteraction, setUserInteraction } = useUserInteraction();
  const { userData, setUserData } = useUserData();

  const [steps, setSteps] = useState(tabData.tabs);
  const [currentStep, setCurrentStep] = useState(
    tabData.tabs.find((s) => s.tabId === userInteraction.workingStep)
  );

  useEffect(() => {
    const cs = tabData.tabs.find(
      (s) => s.tabId === userInteraction.workingStep
    );

    if (!isEqual(cs, currentStep)) {
      setCurrentStep(cs);
    }
  }, [userInteraction.workingStep, tabData.tabs, currentStep]);

  useEffect(() => {
    setSteps(
      steps
        ? [
            ...steps.map((s, idx) => ({
              ...s,
              tabHelper: tabData.tabs[idx].tabHelper,
              tabSubtitle: tabData.tabs[idx].tabSubtitle,
              tabLabel: tabData.tabs[idx].tabLabel,
            })),
          ]
        : tabData.tabs
    );

    setCurrentStep({
      ...currentStep,
      tabHelper: t(tabData.tabs[currentStep.tabNumber - 1].tabHelper),
      tabSubtitle: t(tabData.tabs[currentStep.tabNumber - 1].tabSubtitle),
      tabLabel: t(tabData.tabs[currentStep.tabNumber - 1].tabLabel),
    });
  }, [i18n.language]);

  useEffect(() => {
    if (
      !userInteraction.startedFilling &&
      userInteraction.stepsCompleted.length === 0 &&
      userInteraction.touchedScreens.length === 0
    ) {
      return;
    }

    setTimeout(() => {
      if (document.querySelector("form")) {
        document.querySelector("form").scrollIntoView({ behavior: "smooth" });
      }
    }, 50);
  }, [currentStep.tabNumber]);

  function nextStep(
    data,
    dataSection,
    progress = true,
    userInteractionData = {}
  ) {
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
      ...userInteractionData,
      stepsCompleted: removeDuplicates([
        ...steps.filter((s) => s.complete).map((s) => s.tabId),
        ...userInteraction.stepsCompleted,
        currentStep.tabId,
      ]),
      touchedScreens: removeDuplicates([
        ...userInteraction.touchedScreens,
        dataSection,
      ]),
      workingStep: calcNextStep(steps, currentStep).tabId,
    });
  }

  function handleTabClick(id) {
    const selectedTab = steps.find((el) => el.tabId === id);
    setCurrentStep(selectedTab);
    setUserInteraction({ workingStep: id });
    setTimeout(() => {
      if (document.querySelector("form")) {
        document.querySelector("form").scrollIntoView({ behavior: "smooth" });
      }
    }, 50);
  }

  return (
    <div className="form-layout">
      <Tabs
        tabData={{
          title: t("tab_header_welcome"),
          icon: tabData.icon,
          tabs: steps,
        }}
        activeTab={userInteraction.workingStep || currentStep.tabId}
        onTabClick={userInteraction.send ? null : handleTabClick}
      />
      <div className="form-container">
        {currentStep.tabId === "personalFields" && (
          <Personal
            currentStep={currentStep}
            comingStep={calcNextStep(steps, currentStep)}
            nextStep={nextStep}
            defaultValues={reFormatForFormData(userData["personalFields"])}
          />
        )}
        {currentStep.tabId === "businessFields" && (
          <Business
            currentStep={currentStep}
            comingStep={calcNextStep(steps, currentStep)}
            nextStep={nextStep}
            defaultValues={reFormatForFormData(userData["businessFields"])}
          />
        )}
        {currentStep.tabId === "taxInfoFields" && (
          <TaxInfo
            currentStep={currentStep}
            comingStep={calcNextStep(steps, currentStep)}
            nextStep={nextStep}
            defaultValues={reFormatForFormData(userData["taxInfoFields"])}
          />
        )}
        {currentStep.tabId === "taxEstimateFields" && (
          <TaxEstimate
            currentStep={currentStep}
            comingStep={calcNextStep(steps, currentStep)}
            nextStep={nextStep}
            defaultValues={reFormatForFormData(userData["taxEstimateFields"])}
          />
        )}
        {currentStep.tabId === "bankAccountFields" && (
          <BankAccount
            currentStep={currentStep}
            comingStep={calcNextStep(steps, currentStep)}
            nextStep={nextStep}
            defaultValues={reFormatForFormData(userData["bankAccountFields"])}
          />
        )}
        {currentStep.tabId === "reviewFields" && (
          <Review
            currentStep={currentStep}
            comingStep={calcNextStep(steps, currentStep)}
            nextStep={nextStep}
            defaultValues={reFormatForFormData(userData["reviewFields"])}
          />
        )}
        {currentStep.tabId === "manageTaxes" && <ManageTaxes />}
      </div>
      {currentStep.tabId !== "manageTaxes" && (
        <div className="helper-container"></div>
      )}
    </div>
  );
};

export default Form;
