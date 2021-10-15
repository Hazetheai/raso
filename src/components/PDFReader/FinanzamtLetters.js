import React, { useEffect, useState } from "react";
import PDFReader from ".";
import "./finanzamtLetters.css";
import { useTranslation } from "react-i18next";
import Modal from "components/Modal";

function getLetterName(pdfUrl) {
  return /\/\w*\.pdf/.exec(pdfUrl)[0].replace(/\/|\.pdf/g, "");
}

export const FinanzamtLetters = ({ finanzamtLetters }) => {
  const [currentLetter, setCurrentLetter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [windowSize, setWindowSize] = useState(window.innerHeight * 0.7);

  //   useEffect(() => {
  //       setWindowSize(window.innerHeight * .7)

  //   }, [])

  const { t } = useTranslation();

  useEffect(() => {
    if (currentLetter) {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  }, [currentLetter]);

  function setLetter(pdfUrl) {
    setCurrentLetter(pdfUrl);
  }

  return (
    <>
      <section>
        <div className="flex-container raso-letter-section raso-a-section">
          {finanzamtLetters.map((letter) => {
            const heading = `raso_pdf_heading_${getLetterName(letter.pdf_url)}`;
            const content = `raso_pdf_content_${getLetterName(letter.pdf_url)}`;

            return (
              <div
                key={letter.image_url}
                className="flex-container flex-column raso-letter-element"
              >
                <div
                  title={t("read_pdf")}
                  role="button"
                  onClick={() => setLetter(letter["pdf_url"])}
                  data-
                  letterpdfurl={letter["pdf_url"]}
                  className="raso-letter-img-wrapper"
                >
                  <img
                    src={letter["image_url"]}
                    alt={t(heading)}
                    className="raso-letter-img"
                  />
                </div>
                <h4 className="raso-letter-heading">
                  <strong>{t(heading)}</strong>
                </h4>
                <p className="raso-letter-p">{t(content)}</p>
              </div>
            );
          })}
        </div>
      </section>
      <Modal
        openModal={isModalOpen}
        onClose={() => setLetter("")}
        overRideStyles={{ content: { padding: 0 } }}
      >
        <div className="pdf-reader-wrapper">
          <PDFReader pdfUrl={currentLetter} />
        </div>
      </Modal>
    </>
  );
};

export default FinanzamtLetters;
