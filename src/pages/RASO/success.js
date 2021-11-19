import Button from "components/Button";
import CTA from "components/CTA";
import SecondaryCTA from "components/CTA/SecondaryCTA";
import FAQ from "components/FAQ";
import RASOSuccessBSection from "components/Misc/RASOSuccessBSection";
import FinanzamtLetters from "components/PDFReader/FinanzamtLetters";
import React from "react";
import { useTranslation } from "react-i18next";
import { gtagEvent } from "res/gtag";
import checkmark from "res/images/checkmark.svg";
import rasoCTAImage from "res/images/raso-cta-2-illustration.png";
import { useUserData } from "userData";
import { useUserInteraction } from "userInteraction";

const SuccessPage = () => {
  const { t } = useTranslation();
  const { userInteraction, setUserInteraction } = useUserInteraction();
  const { userData, setUserData } = useUserData();

  const ctaData = {
    preHeadline: t("success_cta_join_pre_headline"),
    mainImageSrc: rasoCTAImage,
    headline: t("success_cta_join_headline"),
    subheadline: t("success_cta_join_sub_headline"),
    mobileActionElementText: t("success_cta_join_mobile_action_element_text"),
    mobileActionElementLink: userInteraction.downloadAppLink_mobile,
    desktopActionElementText: t("success_cta_join_desktop_action_element_text"),
    desktopActionElementLink:
      userInteraction.downloadAppLink_desktop ??
      "http://onboarding.accountable.de/en/",
    isButton: false,
    action: () => gtagEvent("RASO_CLICKED_DOWNLOADAPP-ITER-1"),
    offerPromises: [
      { imgSrc: checkmark, text: t("success_cta_join_offer_promises_text_1") },
      { imgSrc: checkmark, text: t("success_cta_join_offer_promises_text_2") },
    ],
  };

  const faqData = {
    containerClassName: "raso-success-faq",
    title: "FAQ ⭐️ ",
    questions: new Array(8).fill({}).map((q, idx) => ({
      title: t(`raso_success_a_section_faq_${idx + 1}_title`),
      xerius_number: idx,
      answer: t(`raso_success_a_section_faq_${idx + 1}_answer`, {
        interpolation: { escapeValue: false },
      }),
    })),
  };

  return (
    <div className="content">
      <Button
        text={userInteraction.version === "a" ? "Set B" : "Set A"}
        func={() =>
          setUserInteraction({
            version: userInteraction.version === "a" ? "b" : "a",
          })
        }
      />
      {userInteraction.version === "a" && (
        <>
          <FinanzamtLetters
            finanzamtLetters={userData.reviewFields?.finanzamtLetters || []}
          />
          <SecondaryCTA />
          <CTA {...ctaData} />

          <FAQ faqData={faqData} />
        </>
      )}

      {userInteraction.version === "b" && <RASOSuccessBSection />}
    </div>
  );
};

export default SuccessPage;
