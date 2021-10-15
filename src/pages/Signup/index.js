import React, { Fragment } from "react";
import Logo from "../../components/Common/Logo";
import Headline from "../../components/Common/Headline";
import Subheadline from "../../components/Common/Subheadline";
import Form from "./Form";
import Checkmarks from "./Checkmarks";
import { useTranslation } from "react-i18next";

import Badges from "./Badges";
import { country } from "../../settings/config";
import CTA, { CTAsampleData } from "components/CTA";
import Modal from "components/Modal";
import FAQ from "components/FAQ";
import PDFReader from "components/PDFReader";
import pdfData from "res/letterData.json";
import FinanzamtLetters from "components/PDFReader/FinanzamtLetters";

const Signup = () => {
  const { t } = useTranslation();
  return (
    <div className="content">
      <div className="content_left">
        <Logo />
        <Headline>{t("create_your_account")}</Headline>
        <Subheadline>{t("subheadline")}</Subheadline>
        <Checkmarks />
        <Form />
        <FAQ />
        <Modal buttonText="Open modal" />

        <CTA {...CTAsampleData} />

        {/* <PDFReader pdfUrl={pdfData.married_letters[0].pdf_url} /> */}

        <FinanzamtLetters finanzamtLetters={pdfData.married_letters} />

        {country === "de" && <Badges />}
      </div>
    </div>
  );
};

export default Signup;
