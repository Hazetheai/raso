import Tabs from "components/Tabs";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { removeDuplicates } from "res/lib";
import { useUserData } from "userData";
import { useUserInteraction } from "userInteraction";
import BankAccount from "./BankAccount";
import Business from "./Business";
import "./form-layout.css";
import "./form.css";
import { formatDatasection, reFormatForFormData, wrap } from "./helpers";
import Personal from "./Personal";
import Review from "./Review";
import TaxEstimate from "./TaxEstimate";
import TaxInfo from "./TaxInfo";
import home from "res/images/home.svg";

const tabs = [
  "personalFields",
  "businessFields",
  "taxInfoFields",
  "taxEstimateFields",
  "bankAccountFields",
  "reviewFields",
];

function calcNextStep(steps, currentStep) {
  return steps[
    wrap(
      steps.map((el) => el.tabId).indexOf(currentStep.tabId) + 1,
      0,
      steps.length - 1
    )
  ];
}

const Form = ({}) => {
  const { t, i18n } = useTranslation();
  const { userInteraction, setUserInteraction } = useUserInteraction();
  const layoutRef = useRef(null);
  const { userData, setUserData } = useUserData();

  const tabData = {
    title: t("tab_header_welcome"),
    icon: home,
    tabs: tabs.map((tab, idx) => {
      const helper = t(`tab_${tab}_helper`, {
        interpolation: { escapeValue: false },
      });
      return {
        tabNumber: idx + 1,
        tabLabel: t(`tab_${tab}_label`),
        tabSubtitle: t(`tab_${tab}_subtitle`),
        tabId: `${tab}`,
        complete: false,
        touched: false,
        tabHelper: /_/g.test(helper) ? null : helper,
      };
    }),
  };

  const [steps, setSteps] = useState(tabData.tabs);
  const [currentStep, setCurrentStep] = useState(
    userInteraction.workingStep
      ? tabData.tabs.find((s) => s.tabId === userInteraction.workingStep)
      : tabData.tabs[0]
  );

  useEffect(() => {
    // TODO Reload Translations
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
      tabHelper: tabData.tabs[currentStep.tabNumber - 1].tabHelper,
      tabSubtitle: tabData.tabs[currentStep.tabNumber - 1].tabSubtitle,
      tabLabel: tabData.tabs[currentStep.tabNumber - 1].tabLabel,
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

    layoutRef.current.scrollIntoView({ behaviour: "smooth" });
  }, [currentStep.tabNumber]);

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
  }

  return (
    <div ref={layoutRef} className="form-layout">
      <Tabs
        tabData={{
          title: t("tab_header_welcome"),
          icon: tabData.icon,
          tabs: steps,
        }}
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
      </div>
    </div>
  );
};

export default Form;
