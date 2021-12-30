import Button from "components/Button";
import CTA from "components/CTA";
import CalendlyCTA from "components/CTA/CalendlyCTA";
import FAQ from "components/FAQ";
import RASOSuccessBSection from "components/Misc/RASOSuccessBSection";
import FinanzamtLetters from "components/PDFReader/FinanzamtLetters";
import { useUserData } from "data-layer/userData";
import { useUserInteraction } from "data-layer/userInteraction";
import { useUserTesting } from "data-layer/userTesting";
import React from "react";
import { gtagEvent } from "res/gtag";
import checkmark from "res/images/checkmark.svg";
import rasoCTAImage from "res/images/raso-cta-2-illustration.png";
import { isDev } from "settings/config";

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

const faqData = {
  containerClassName: "raso-success-faq",
  title: "FAQ ⭐️ ",
  questions: new Array(8).fill({}).map((q, idx) => ({
    title: `raso_success_a_section_faq_${idx + 1}_title`,
    xerius_number: idx,
    answer: `raso_success_a_section_faq_${idx + 1}_answer`,
  })),
};

const SuccessPage = () => {
  const { userTesting, setUserTesting } = useUserTesting();
  const { userInteraction } = useUserInteraction();
  const { userData } = useUserData();

  return (
    <div className="content">
      {isDev && (
        <Button
          text={userTesting.successPage === "a" ? "Set B" : "Set A"}
          func={() =>
            setUserTesting({
              successPage: userTesting.successPage === "a" ? "b" : "a",
            })
          }
        />
      )}
      {userTesting.successPage === "a" && (
        <>
          <FinanzamtLetters
            finanzamtLetters={userData.reviewFields?.finanzamtLetters || []}
          />
          <CalendlyCTA />
          <CTA
            {...ctaData}
            mobileActionElementLink={userInteraction.downloadAppLink_mobile}
            desktopActionElementLink={
              userInteraction.downloadAppLink_desktop ||
              "http://onboarding.accountable.de/en/"
            }
          />

          <FAQ faqData={faqData} />
        </>
      )}

      {userTesting.successPage === "b" && <RASOSuccessBSection />}
    </div>
  );
};

export default SuccessPage;
