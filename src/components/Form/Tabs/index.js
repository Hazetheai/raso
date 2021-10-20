import React, { Fragment } from "react";
import "./tabs.css";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import UserImg from "./user.svg";
import BusinessImg from "./business.svg";
import PlaneImg from "./plane.svg";
import { useUserData } from "../../../userData";

const Tabs = ({ step }) => {
  const { t } = useTranslation();
  const { userData } = useUserData();
  return (
    <div className="tabs">
      {!userData.rasoRef && (
        <Fragment>
          <span
            className={clsx(
              "tabs_tab",
              "tabs_tab--enabled",
              step == 0 && "tabs_tab--active"
            )}
          >
            <img src={PlaneImg} alt="" className="tabs_tab_icon" />
            {t("start_tab")}
          </span>
          <span
            className={clsx(
              "tabs_tab",
              step > 0 && "tabs_tab--enabled",
              step == 1 && "tabs_tab--active"
            )}
          >
            <img src={UserImg} alt="" className="tabs_tab_icon" />
            {t("about_you_tab")}
          </span>
          <span
            className={clsx(
              "tabs_tab",
              step > 1 && "tabs_tab--enabled",
              step == 2 && "tabs_tab--active"
            )}
          >
            <img src={BusinessImg} alt="" className="tabs_tab_icon" />
            {t("business_tab")}
          </span>
        </Fragment>
      )}
    </div>
  );
};
export default Tabs;
