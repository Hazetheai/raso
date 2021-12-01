import FAQ from "components/FAQ";
import Form from "components/Form/";
import Toast from "components/Toast";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useUserInteraction } from "userInteraction";
import rasoCTAImage from "res/images/raso-cta-2-illustration.png";
import { gtagEvent } from "res/gtag";
import checkmark from "res/images/checkmark.svg";
import CTA from "components/CTA";

const RASO = ({ lang }) => {
  const { t, i18n } = useTranslation();
  // if (i18n.language !== lang) {
  //   i18n.changeLanguage(lang);
  // }

  const { userInteraction } = useUserInteraction();

  const faqData = {
    containerClassName: "raso-faq",
    title: "FAQ ⭐️ ",
    questions: new Array(6).fill({}).map((q, idx) => ({
      title: t(`faq_raso_q_${idx + 1}_title`),
      xerius_number: idx,
      answer: t(`faq_raso_q_${idx + 1}_answer`, {
        interpolation: { escapeValue: false },
      }),
    })),
  };

  const ctaData = {
    preHeadline: t("success_cta_join_pre_headline"),
    mainImageSrc: rasoCTAImage,
    headline: t("success_cta_join_headline"),
    subheadline: t("success_cta_join_sub_headline"),
    mobileActionElementText: t("success_cta_join_mobile_action_element_text"),
    mobileActionElementLink: userInteraction.downloadAppLink_mobile,
    desktopActionElementText: t("success_cta_join_desktop_action_element_text"),
    desktopActionElementLink:
      userInteraction.downloadAppLink_desktop ||
      "http://onboarding.accountable.de/en/",
    isButton: false,
    action: () => gtagEvent("RASO_CLICKED_DOWNLOADAPP-ITER-1"),
    offerPromises: [
      { imgSrc: checkmark, text: t("success_cta_join_offer_promises_text_1") },
      { imgSrc: checkmark, text: t("success_cta_join_offer_promises_text_2") },
    ],
  };

  return (
    <div className="content">
      <Form />

      {userInteraction.workingStep === "manageTaxes" && <CTA {...ctaData} />}
      {(userInteraction.workingStep === "personalFields" ||
        userInteraction.workingStep === "manageTaxes") && (
        <FAQ faqData={faqData} />
      )}
      <Toast text="Autosaving" active={userInteraction.isAutoSaving} />
    </div>
  );
};

export default RASO;
