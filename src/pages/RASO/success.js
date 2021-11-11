import React from "react";
import { useTranslation } from "react-i18next";
import rasoCTAImage from "res/images/raso-cta-2-illustration.png";
import checkmark from "res/images/checkmark.svg";
import CTA from "components/CTA";

const SuccessPage = () => {
  const { t } = useTranslation();

  const ctaData = {
    preHeadline: t("success_cta_join_pre_headline"),
    mainImageSrc: rasoCTAImage,
    headline: t("success_cta_join_headline"),
    subheadline: t("success_cta_join_sub_headline"),
    mobileActionElementText: t("success_cta_join_mobile_action_element_text"),
    mobileActionElementLink: t("success_cta_join_mobile_action_element_link"),
    desktopActionElementText: t("success_cta_join_desktop_action_element_text"),
    desktopActionElementLink: t("success_cta_join_desktop_action_element_link"),
    isButton: false,
    action: () => console.log("Click CTA"),
    offerPromises: [
      { imgSrc: checkmark, text: t("success_cta_join_offer_promises_text_1") },
      { imgSrc: checkmark, text: t("success_cta_join_offer_promises_text_2") },
    ],
  };
  return (
    <div>
      <CTA {...ctaData} />
    </div>
  );
};

export default SuccessPage;
