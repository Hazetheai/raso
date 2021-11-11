import Button from "components/Button";
import FAQ from "components/FAQ";
import Form from "components/Form/";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const RASO = () => {
  const { t, i18n } = useTranslation();

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

  return (
    <div className="content">
      <Form />
      <FAQ faqData={faqData} />
    </div>
  );
};

export default RASO;
