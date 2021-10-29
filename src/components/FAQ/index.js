import React from "react";

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
  AccordionItemState,
} from "react-accessible-accordion";
import "./faq.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";

export const sampleFaqData = {
  containerClassName: "raso-faq",
  title: "FAQ ⭐️ ",
  questions: [
    {
      title: "Ist dies das Formular, das ich gesucht habe? ",
      xerius_number: 0,
      answer: `Um dich in Deutschland selbstständig zu machen, musst du den "Fragebogen zur steuerlichen Erfassung" ausfüllen. Mit diesem Formular beantragst du gleichzeitig auch deine Steuernummer. Der offizielle Fragebogen kann auf unserer Website direkt ans Finanzamt übermittelt werden. <br/><br/>
      Wenn du dich also selbstständig machen willst, hast du das richtige Formular gefunden!`,
    },
    {
      title: "Benötige ich ein ELSTER Konto dafür?",
      xerius_number: 1,
      answer: `Du musst nicht extra ein ELSTER Konto erstellen, um den Fragebogen zu übermitteln! Wir übertragen dein Formular direkt über unsere offizielle ELSTER Schnittstelle. So ersparen wir dir die Anmeldung bei ELSTER.`,
    },
  ],
};

const FAQ = ({ faqData, containerClassName }) => {
  return (
    <section className={clsx("section-faq", containerClassName || "")}>
      <Accordion allowZeroExpanded>
        <div className="container container-faq">
          <h2 className="section-h2">{faqData.title}</h2>
          {faqData.questions.map((question) => {
            return (
              <AccordionItem key={question.title} className="faq-question">
                <AccordionItemHeading>
                  <AccordionItemButton className="faq-button">
                    <h3
                      className="faq-h3"
                      id={`xerius-q${question["xerius_number"]}`}
                    >
                      {question["title"]}
                    </h3>
                    <AccordionItemState>
                      {({ expanded }) =>
                        expanded ? (
                          <FontAwesomeIcon
                            className="faq-icon"
                            icon={faMinus}
                          />
                        ) : (
                          <FontAwesomeIcon className="faq-icon" icon={faPlus} />
                        )
                      }
                    </AccordionItemState>
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel className="faq-box-answer">
                  <div id={`xerius-a${question["xerius_number"]}`}>
                    <p
                      dangerouslySetInnerHTML={{ __html: question["answer"] }}
                    />
                  </div>
                </AccordionItemPanel>
              </AccordionItem>
            );
          })}
        </div>
      </Accordion>
    </section>
  );
};

export default FAQ;
