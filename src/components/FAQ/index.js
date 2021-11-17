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

const FAQ = ({ faqData }) => {
  return (
    <section className={clsx("section-faq", faqData.containerClassName || "")}>
      <Accordion allowZeroExpanded>
        <div className=" container-faq">
          <h2 className="section-h2 faq-title">{faqData.title}</h2>
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
                      className="faq-answer"
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
