import FAQ from "components/FAQ";
import Form from "components/Form/";
import Toast from "components/Toast";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useUserInteraction } from "userInteraction";

const RASO = ({ lang }) => {
  const { t, i18n } = useTranslation();
  if (i18n.language !== lang) {
    i18n.changeLanguage(lang);
  }

  const { userInteraction, setUserInteraction } = useUserInteraction();

  useEffect(() => {
    setUserInteraction({ version: Math.random() > 0.5 ? "a" : "b" });
  }, []);

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
      <Toast text="Autosaving" active={userInteraction.isAutoSaving} />
    </div>
  );
};

export default RASO;
