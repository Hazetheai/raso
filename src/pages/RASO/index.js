import CTA from "components/CTA";
import FAQ from "components/FAQ";
import Form from "components/Form/";
import Toast from "components/Toast";
import { useUserInteraction } from "data-layer/userInteraction";
import { useUserTesting } from "data-layer/userTesting";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { gtagEvent } from "res/gtag";
import checkmark from "res/images/checkmark.svg";
import home from "res/images/home.svg";
import rasoCTAImage from "res/images/raso-cta-2-illustration.png";

const faqData = {
  containerClassName: "raso-faq",
  title: "FAQ ⭐️ ",
  questions: new Array(6).fill({}).map((q, idx) => ({
    title: `faq_raso_q_${idx + 1}_title`,
    xerius_number: idx,
    answer: `faq_raso_q_${idx + 1}_answer`,
  })),
};

const ctaData = {
  preHeadline: "success_cta_join_pre_headline",
  mainImageSrc: rasoCTAImage,
  headline: "success_cta_join_headline",
  subheadline: "success_cta_join_sub_headline",
  mobileActionElementText: "success_cta_join_mobile_action_element_text",
  desktopActionElementText: "success_cta_join_desktop_action_element_text",
  isButton: false,
  action: () => gtagEvent("RASO_CLICKED_DOWNLOADAPP-ITER-1"),
  offerPromises: [
    { imgSrc: checkmark, text: "success_cta_join_offer_promises_text_1" },
    { imgSrc: checkmark, text: "success_cta_join_offer_promises_text_2" },
  ],
};

const tabs = [
  "personalFields",
  "businessFields",
  "taxInfoFields",
  "taxEstimateFields",
  "bankAccountFields",
  "reviewFields",
  "manageTaxes",
];

const tabData = {
  title: "tab_header_welcome",
  icon: home,
  tabs: tabs.map((tab, idx, arr) => {
    const helper = `tab_${tab}_helper`;
    return {
      tabNumber: idx + 1,
      tabLabel: `tab_${tab}_label`,
      tabSubtitle: `tab_${tab}_subtitle`,
      tabId: `${tab}`,
      complete: false,
      touched: false,
      // hidden: idx < arr.length - 1 ? false : true,
      tabHelper: /_/g.test(helper) ? null : helper,
    };
  }),
};

const RASO = () => {
  const { userInteraction } = useUserInteraction();
  const { userTesting } = useUserTesting();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    gtagEvent("RASO_PAGEVIEW-ITER-1", {
      path: window.location.pathname,
      version: `12/10/2021_${userTesting.successPage}`,
      video: `12/10/2021_${userTesting.videoSection}`,
    });
    gtagEvent("RASO_TAB-ITER-1", { tab: "#personal" });
  }, []);

  return (
    <div className="content">
      <Form tabData={tabData} />
      {userInteraction.workingStep === "manageTaxes" &&
        userInteraction.success &&
        userInteraction.stepsCompleted.length > 5 && (
          <CTA
            {...ctaData}
            mobileActionElementLink={userInteraction.downloadAppLink_mobile}
            desktopActionElementLink={
              userInteraction.downloadAppLink_desktop ||
              `http://onboarding.accountable.de/${
                i18n.language === "de" ? "" : "en"
              }`
            }
          />
        )}
      {(userInteraction.workingStep === "personalFields" ||
        userInteraction.workingStep === "manageTaxes") && (
        <FAQ faqData={faqData} />
      )}
      <Toast text="Autosaving" active={userInteraction.isAutoSaving} />
    </div>
  );
};

export default RASO;
