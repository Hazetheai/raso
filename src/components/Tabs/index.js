import React from "react";
import home from "res/images/home.svg";
import "./tabs.css";

export const sampleTabData = {
  title: "Wilkommen",
  icon: home,
  tabs: [
    {
      tabNumber: "1",
      tabLabel: "Persönliche Daten",
      tabId: "raso_tab-0",
    },
    {
      tabNumber: "2",
      tabLabel: "Geschäftliche Daten",
      tabId: "raso_tab-1",
    },
    {
      tabNumber: "3",
      tabLabel: "Steuerliche Angaben",
      tabId: "raso_tab-2",
    },
    {
      tabNumber: "4",
      tabLabel: "Steuerschätzung",
      tabId: "raso_tab-3",
    },
    {
      tabNumber: "5",
      tabLabel: "Bankkonto",
      tabId: "raso_tab-4",
    },
    {
      tabNumber: "6",
      tabLabel: "Prüfen & abschicken",
      tabId: "raso_tab-5",
    },
  ],
};

const Tabs = ({ tabData, activeTab, onTabClick }) => {
  return (
    <div className="tab-container">
      <nav className="tab-nav">
        <div className={`tab-nav__header`} title={tabData.title}>
          <span className="tab-nav__header-icon">
            <img src={tabData.icon} alt={tabData.title} />
          </span>
          <span className="tab-nav__header-title">{tabData.title}</span>
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
                className={`tab-nav__tab ${
                  activeTab === tabId ? "active" : ""
                }`}
                id={tabId}
              >
                <span className="tab-nav__nav-number">{tabNumber}</span>
                <span className="tab-nav__nav-label">{tabLabel}</span>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Tabs;
