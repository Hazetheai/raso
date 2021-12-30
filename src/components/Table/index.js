import clsx from "clsx";
import Button from "components/Button";
import { LogoImg } from "components/Common/Logo";
import { ExternalLink } from "components/Link";
import { useUserInteraction } from "data-layer/userInteraction";
import useDeviceDetect from "hooks/useDeviceDetect";
import { useWindowSize } from "hooks/useWindowSize";
import React, { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { gtagEvent } from "res/gtag";
import checkFalse from "res/images/comparison-check-false.png";
import checkTrue from "res/images/comparison-check-true.png";
import ElsterLogo from "res/images/elster-logo.svg";
import mobileElsLogo from "res/images/elster-mobile.png";
import mobileAccLogo from "res/images/logo192.png";
import "./table.css";

export const sampleTableData = {
  columns: [
    { text: "success_table_heading_1" },
    {
      text: "success_table_heading_2",
      logo: ElsterLogo,
      mobileLogo: mobileElsLogo,
    },
    {
      text: "success_table_heading_3",
      logo: LogoImg,
      mobileLogo: mobileAccLogo,
    },
  ],
  rows: [
    { text: "success_table_row_1", data: [true, true] },
    { text: "success_table_row_2", data: [true, true] },
    { text: "success_table_row_3", data: [true, true] },
    { text: "success_table_row_4", data: [false, true] },
    { text: "success_table_row_5", data: [false, true] },
    { text: "success_table_row_6", data: [false, true] },
    { text: "success_table_row_7", data: [false, true] },
    { text: "success_table_row_8", data: [false, true] },
  ],
  actionElements: [
    null,
    {
      link: "https://www.elster.de/eportal/registrierung-auswahl",
      text: "success_table_elster_actionElement_text",
      secondary: true,
    },
    {
      link: "dlAppLink",
      text: "success_table_accountable_actionElement_text",
      gtagEvent: { event: "RASO_CLICKED_DOWNLOADAPP-ITER-1", params: {} },
    },
  ],
};

const Table = ({ tableData }) => {
  const { t, i18n } = useTranslation();
  const { userInteraction, setUserInteraction } = useUserInteraction();
  const { width } = useWindowSize();
  const { isMobile } = useDeviceDetect();

  const [actionElements, setActionElements] = useState(
    tableData.actionElements
  );

  useEffect(() => {
    const appLink = tableData.actionElements?.find(
      (el) => el?.link === "dlAppLink"
    );

    if (appLink?.link) {
      const dlAppLink = isMobile
        ? userInteraction.downloadAppLink_mobile
        : userInteraction.downloadAppLink_desktop;

      setActionElements(
        tableData.actionElements.map((el) =>
          el?.link === "dlAppLink"
            ? {
                ...el,
                link:
                  dlAppLink ||
                  `http://onboarding.accountable.de/${
                    i18n.language === "de" ? "" : "en"
                  }`,
              }
            : el
        )
      );
    }
  }, [userInteraction.downloadAppLink_desktop]);

  return (
    <div
      className="grid table-container"
      style={{
        gridTemplateColumns: `repeat(${tableData.columns.length}, minmax(100px, 1fr))`,
      }}
    >
      {tableData.columns &&
        tableData.columns.map((heading) => (
          <Fragment key={heading.text}>
            <span className="table-heading">
              {heading.logo ? (
                <img src={heading.logo} alt={heading.text} />
              ) : (
                <strong>{t(heading?.text)}</strong>
              )}
            </span>
          </Fragment>
        ))}

      {tableData.rows &&
        tableData.rows.map((row, idx) => (
          <Fragment key={row.text}>
            <span
              className={clsx(
                "table-row-heading",
                idx % 2 === 0 ? "even" : "odd"
              )}
            >
              <strong>{t(row.text)} </strong>
            </span>
            {row.data.map((d, i) =>
              d ? (
                <span
                  key={i}
                  className={clsx(
                    "table-row-data table-row-data--true",
                    idx % 2 === 0 ? "even" : "odd"
                  )}
                >
                  <img src={checkTrue} alt="" />
                </span>
              ) : (
                <span
                  key={i}
                  className={clsx(
                    "table-row-data table-row-data--false",
                    idx % 2 === 0 ? "even" : "odd"
                  )}
                >
                  <img src={checkFalse} alt="" />{" "}
                </span>
              )
            )}
          </Fragment>
        ))}

      {actionElements &&
        actionElements.map((el, i) => {
          if (!el) {
            return (
              <span
                key={i}
                className={clsx("table-row-heading", "row--empty")}
              ></span>
            );
          }
          if (el.link) {
            return (
              <span
                key={i}
                className={clsx(
                  "table-row-data table-row-data--actionElement",
                  el.secondary && "row--empty"
                )}
              >
                <ExternalLink
                  key={el.link}
                  href={el.link}
                  func={() =>
                    el.gtagEvent
                      ? gtagEvent(
                          el.gtagEvent?.event,
                          el.gtagEvent?.params || {}
                        )
                      : null
                  }
                  secondary={el.secondary}
                  className="table-row-acc-button"
                  target="_blank"
                >
                  {width > 730 ? (
                    t(el?.text)
                  ) : (
                    <img
                      src={tableData["columns"][i]["mobileLogo"]}
                      alt={el.text}
                    />
                  )}
                </ExternalLink>
              </span>
            );
          }

          return (
            <span
              key={i}
              className={"table-row-data table-row-data--actionElement"}
            >
              {" "}
              <Button
                key={el.text}
                func={() =>
                  el.gtagEvent
                    ? gtagEvent(el.gtagEvent?.event, el.gtagEvent?.params || {})
                    : null
                }
              >
                {t(el?.text)}
              </Button>
            </span>
          );
        })}
    </div>
  );
};

export default Table;
