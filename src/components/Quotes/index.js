import React from "react";
import "./quotes.css";
const Quotes = () => {
  return (
    <div className="raso-trust raso-b-section">
      <span className="section-h2 section-h2--raso-b-section ">
        Trusted by 10,000 self-employed to manage invoices, receipts &amp; taxes{" "}
      </span>
      <div className="flex-container quote-carousel">
        <div className="quote-element quote-element-1">
          <div className="quote-infos">
            <img
              src="https://www.accountable.de/wp-content/themes/accountable/assets/images/homepage/reviews/martha.jpg"
              className="quote-element-image"
              alt="Martha"
            />
            <div className="quote-element-name">
              Martha
              <br />
              <span className="quote-element-job">Designer</span>
            </div>
            <div className="quote-element-right">
              <img
                src="https://www.accountable.de/wp-content/themes/accountable/assets/images/homepage/stars.svg"
                alt=""
              />

              <span className="quote-element-store">App store</span>
            </div>
          </div>
          <p className="quote-element-p">
            Great automation for freelancers. Integration with the bank account
            helps you to keep track of the expenses in real time. Bills on
            email? You simply fwd the email and the app will attach it to
            correct expense. Simple invoicing is great. And integration with
            Elster lets you do the Vat returns automatically.
          </p>
        </div>
        <div className="quote-element quote-element-2">
          <div className="quote-infos">
            <img
              src="https://www.accountable.de/wp-content/themes/accountable/assets/images/homepage/reviews/paul.jpg"
              className="quote-element-image"
              alt="Paul"
            />
            <div className="quote-element-name">
              Paul
              <br />
              <span className="quote-element-job">Developer</span>
            </div>
            <div className="quote-element-right">
              <img
                src="https://www.accountable.de/wp-content/themes/accountable/assets/images/homepage/stars.svg"
                alt=""
              />

              <span className="quote-element-store">App store</span>
            </div>
          </div>
          <p className="quote-element-p">
            Fantastic for freelancers to do the bookeeping and prepare tax
            returns.
            <br />
            Accountable has made my freelancer life much easier since it takes
            care of all the admin part. It’s a fantastic tool and their customer
            support is great!
          </p>
        </div>
        <div className="quote-element quote-element-3">
          <div className="quote-infos">
            <img
              src="https://www.accountable.de/wp-content/themes/accountable/assets/images/homepage/reviews/yanique.jpg"
              className="quote-element-image"
              alt="Yanique"
            />
            <div className="quote-element-name">
              Yanique
              <br />
              <span className="quote-element-job">Consultant</span>
            </div>
            <div className="quote-element-right">
              <img
                src="https://www.accountable.de/wp-content/themes/accountable/assets/images/homepage/stars.svg"
                alt=""
              />

              <span className="quote-element-store">Play store</span>
            </div>
          </div>
          <p className="quote-element-p">
            This app has saved me so much time on my bookkeeping. It's intuitive
            and easy to use and all my administration is in one place. Next to
            that, the app actually gives you tax saving tips, just with those
            I've saved the more money then the app cost me!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Quotes;
