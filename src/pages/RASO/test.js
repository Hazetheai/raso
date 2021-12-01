import ManageTaxesCTA from "components/CTA/ManageTaxesCTA";
import FAQ from "components/FAQ";
import Form from "components/Form/";
import Table, { sampleTableData } from "components/Table";
import Toast from "components/Toast";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useUserInteraction } from "userInteraction";

const Test = ({ lang }) => {
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

  return (
    <div className="content">
      <Table tableData={sampleTableData} />
      <ManageTaxesCTA />
    </div>
  );
};

export default Test;
