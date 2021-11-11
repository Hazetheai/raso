import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import React from "react";
import home from "res/images/home.svg";
import "./tabs.css";

// export const sampleTabData = {
//   title: "Wilkommen",
//   icon: home,
//   tabs: [
//     {
//       tabNumber: "1",
//       tabLabel: "Persönliche Daten",
//       tabSubtitle:
//         "Alle Daten werden SSL-verschlüsselt und über die ELSTER Schnittstelle sicher an dein Finanzamt übertragen.",
//       tabId: "personalFields",
//       complete: false,
//     },
//     {
//       tabNumber: "2",
//       tabLabel: "Geschäftliche Daten",
//       tabSubtitle:
//         "Alle Daten werden SSL-verschlüsselt und über die ELSTER Schnittstelle sicher an dein Finanzamt übertragen.",
//       tabId: "businessFields",
//       complete: false,
//     },
//     {
//       tabNumber: "3",
//       tabLabel: "Steuerliche Angaben",
//       tabSubtitle:
//         "Alle Daten werden SSL-verschlüsselt und über die ELSTER Schnittstelle sicher an dein Finanzamt übertragen.",
//       tabId: "taxInfoFields",
//       complete: false,
//     },
//     {
//       tabNumber: "4",
//       tabLabel: "Steuerschätzung",
//       tabSubtitle: "",
//       tabHelper: `Diese Angaben bilden die Berechnungsgrundlage für deine vierteljährlichen Vorauszahlungen zur Einkommensteuer und Gewerbesteuer.
//         Bitte wähle mindestens eine Einkommensquelle aus.
//         `,
//       tabId: "taxEstimateFields",
//       complete: false,
//     },
//     {
//       tabNumber: "5",
//       tabLabel: "Bankkonto",
//       tabSubtitle:
//         "Alle Daten werden SSL-verschlüsselt und über die ELSTER Schnittstelle sicher an dein Finanzamt übertragen.",
//       tabId: "bankAccountFields",
//       complete: false,
//     },
//     {
//       tabNumber: "6",
//       tabLabel: "Prüfen & abschicken",
//       tabSubtitle:
//         "Alle Daten werden SSL-verschlüsselt und über die ELSTER Schnittstelle sicher an dein Finanzamt übertragen.",
//       tabId: "reviewFields",
//       complete: false,
//     },
//   ],
// };

const Tabs = ({ tabData, activeTab, onTabClick }) => {
  return (
    <div className="tab-container element-container">
      <nav className="tab-nav">
        <div className={clsx("tab-nav__header")} title={tabData.title}>
          <span className="tab-nav__header-icon ">
            <img src={tabData.icon} alt={tabData.title} />
          </span>
          <span className="tab-nav__header-title body--medium">
            {tabData.title}
          </span>
        </div>
        <hr />
        <ul className="tab-nav__menu">
          {tabData.tabs.map((tab) => {
            const { tabNumber, tabLabel, tabId } = tab;

            return (
              <li
                title={tabLabel}
                onClick={() => (onTabClick ? onTabClick(tabId) : null)}
                key={tabId}
                className={clsx(
                  "tab-nav__tab",
                  activeTab === tabId && "active",
                  tab.complete && "complete"
                )}
                id={tabId}
              >
                <span className="tab-nav__nav-number">
                  {tab.complete ? (
                    <FontAwesomeIcon icon={faCheck} />
                  ) : (
                    tabNumber
                  )}
                </span>
                <span
                  className={clsx(
                    "tab-nav__nav-label body--medium",
                    activeTab === tabId && "body--bold"
                  )}
                >
                  {tabLabel}
                </span>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Tabs;
