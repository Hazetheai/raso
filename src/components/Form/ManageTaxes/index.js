import ManageTaxesCTA from "components/CTA/ManageTaxesCTA";
import useDeviceDetect from "components/hooks/useDeviceDetect";
import Link from "components/Link";
import Table, { sampleTableData } from "components/Table";
import React from "react";
import { useTranslation } from "react-i18next";
import { gtagEvent } from "res/gtag";
import { dlAppLink, webAppLink } from "settings/config";
import { useUserData } from "userData";
import { useUserInteraction } from "userInteraction";
import Fieldset from "../Fieldset";

const ManageTaxes = ({}) => {
  const { userInteraction, setUserInteraction } = useUserInteraction();
  const { userData, setUserData } = useUserData();
  const { isMobile } = useDeviceDetect();
  const { t, i18n } = useTranslation();

  return (
    <>
      <form id={"manageTaxes"}>
        <div className="form">
          <Fieldset section>
            <div className="screen-header">
              {userInteraction.send ? (
                <>
                  <h2
                    className="screen-title"
                    dangerouslySetInnerHTML={{
                      __html: t("tab_manageTaxes_heading", {
                        interpolation: false,
                        name: userData.personalFields.firstname,
                      }),
                    }}
                  />
                  <h2
                    className="screen-title"
                    dangerouslySetInnerHTML={{
                      __html: t("tab_manageTaxes_heading_2", {
                        interpolation: false,
                      }),
                    }}
                  />
                </>
              ) : (
                <h2
                  className="screen-title"
                  dangerouslySetInnerHTML={{
                    __html: t("tab_manageTaxes_heading_empty", {
                      interpolation: false,
                    }),
                  }}
                />
              )}

              {userInteraction.send ? (
                <p className="screen-subtitle screen-subtitle--manageTaxes body--small">
                  {t("tab_manageTaxes_subtitle")}
                </p>
              ) : (
                <Link
                  text={t("test_app_for_free")}
                  func={() => gtagEvent("RASO_CLICKED_DOWNLOADAPP-ITER-1")}
                  href={isMobile ? dlAppLink : webAppLink}
                  target="_blank"
                />
              )}
            </div>
            {userInteraction.send ? (
              <Table tableData={sampleTableData} />
            ) : null}
            <ManageTaxesCTA />
          </Fieldset>
        </div>
      </form>
    </>
  );
};
export default ManageTaxes;
