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

const sampleData = {
  containerClassName: "raso-faq",
  title: "FAQ ⭐️ ",
  questions: [
    {
      title: "What is Accountable?",
      xerius_number: 0,
      answer: `Accountable is the simplest and best solution for self-employed professionals.<br/><br/>
            You can create invoices accepted by the German tax office, scan all your receipts and therefore digitalise your accounting with ease. In addition, Accountable takes care of your tax obligations: whether it's VAT or income tax, with Accountable you won't miss any deadlines. You can send your tax returns directly to your tax office through a secure Elster interface.<br/><br/>
            Even if you don't know anything about the German tax system, with Accountable you can do everything right from the start. We translate the language of the tax office for you and give you valuable tax tips. Our mission is to make your everyday life as a self-employed professional easier, so that you can concentrate on what is really important.`,
    },
    {
      title: "What is your special offer for the new self-employed?",
      xerius_number: 1,
      answer: `Everyone who signs up as a self-employed professional through us can use our best PRO version with all features for 6 months completely free of charge. <br/><br/>
      You don't have to register with your credit card and you don't have to choose a subscription. <br/><br/> 
      We know how difficult it can be to get started, so we want to make it as easy as possible for you. If you like the PRO version, you can decide after the 6 months trial if you want to continue using it. There is no automatic renewal.`,
    },
  ],
};

const FAQ = ({ faqData, containerClassName }) => {
  return (
    <section className={`section-faq ${containerClassName || ""}`}>
      <Accordion allowZeroExpanded>
        <div className="container container-faq">
          <h2 className="section-h2">{(sampleData || faqData).title}</h2>
          {(faqData || sampleData).questions.map((question) => {
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
