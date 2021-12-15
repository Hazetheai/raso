import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import React from "react";
import { useUserInteraction } from "userInteraction";
import "./tabs.css";

const Tabs = ({ tabData, activeTab, onTabClick }) => {
  const { userInteraction } = useUserInteraction();

  const newActiveTab = userInteraction.workingStep || activeTab;
  const { isVideoSectionVisible } = userInteraction;

  function filterTabData(tabData) {
    const newTabData = Object.assign({}, tabData);

    newTabData["tabs"] = newTabData.tabs
      .map((tab) =>
        userInteraction.stepsCompleted.includes(tab.tabId)
          ? { ...tab, complete: true }
          : tab
      )
      .map((tab) =>
        userInteraction.touchedScreens.includes(tab.tabId)
          ? { ...tab, touched: true }
          : tab
      );
    // .map((tab) =>
    //   userInteraction.stepsCompleted.includes("reviewFields")
    //     ? { ...tab, hidden: false }
    //     : tab
    // );

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
          title={tabData.title}
        >
          <span
            className={clsx(
              "tab-nav__header-icon ",
              isVideoSectionVisible && "tab-nav__header-icon--active"
            )}
          >
            <img src={tabData.icon} alt={tabData.title} />
          </span>
          <span
            className={clsx(
              "tab-nav__header-title",
              isVideoSectionVisible &&
                "tab-nav__header-title--active body--bold",
              "body--medium"
            )}
          >
            {tabData.title}
          </span>
        </div>
        <hr />
        <ul className="tab-nav__menu">
          {filterTabData(tabData).tabs.map((tab) => {
            const { tabNumber, tabLabel, tabId } = tab;

            return (
              <li
                title={tabLabel}
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
