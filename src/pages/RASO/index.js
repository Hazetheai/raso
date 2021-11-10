import FAQ, { sampleFaqData } from "components/FAQ";
import FormLayout from "components/Form/";
import React from "react";
import { useTranslation } from "react-i18next";

const RASO = () => {
  const { t } = useTranslation();
  return (
    <div className="content">
      <FormLayout />
      <FAQ faqData={sampleFaqData} />
    </div>
  );
};

export default RASO;
