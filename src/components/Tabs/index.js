import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import React from "react";
import { useUserInteraction } from "data-layer/userInteraction";
import "./tabs.css";
import { useTranslation } from "react-i18next";

const Tabs = ({ tabData, activeTab, onTabClick }) => {
  const { userInteraction } = useUserInteraction();
  const { t } = useTranslation();

  const newActiveTab = userInteraction.workingStep || activeTab;
  const { isVideoSectionVisible } = userInteraction;

  function filterTabData(tabData) {
    const newTabData = { ...tabData };

    newTabData["tabs"] = newTabData.tabs
      .map((tab) => ({
        ...tab,
        complete: userInteraction.stepsCompleted.includes(tab.tabId),
      }))
      .map((tab) => ({
        ...tab,
        touched: userInteraction.touchedScreens.includes(tab.tabId),
      }));

    return newTabData;
  }

  return (
    <div className="tab-container element-container">
      <nav className="tab-nav">
        <div
          className={clsx(
            "tab-nav__header",
            isVideoSectionVisible && "tab-nav__header--active"
          )}
          title={t(tabData.title)}
        >
          <span
            className={clsx(
              "tab-nav__header-icon ",
              isVideoSectionVisible && "tab-nav__header-icon--active"
            )}
          >
            <img src={tabData.icon} alt={t(tabData.title)} />
          </span>
          <span
            className={clsx(
              "tab-nav__header-title",
              isVideoSectionVisible &&
                "tab-nav__header-title--active body--bold",
              "body--medium"
            )}
          >
            {t(tabData.title)}
          </span>
        </div>
        <hr />
        <ul className="tab-nav__menu">
          {filterTabData(tabData).tabs.map((tab) => {
            const { tabNumber, tabLabel, tabId } = tab;

            return (
              <li
                title={t(tabLabel)}
                onClick={() => (onTabClick ? onTabClick(tabId) : null)}
                key={tabId}
                className={clsx(
                  "tab-nav__tab",
                  !isVideoSectionVisible && newActiveTab === tabId && "active",
                  tab.touched && !tab.complete && "incomplete",
                  tab.complete && "complete",
                  tab.hidden && "hidden"
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
                    !isVideoSectionVisible &&
                      newActiveTab === tabId &&
                      "body--bold"
                  )}
                >
                  {t(tabLabel)}
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
