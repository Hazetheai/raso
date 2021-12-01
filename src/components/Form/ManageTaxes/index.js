import ManageTaxesCTA from "components/CTA/ManageTaxesCTA";
import Table, { sampleTableData } from "components/Table";
import React from "react";
import { useTranslation } from "react-i18next";
import { UserDataContext, useUserData } from "userData";
import { useUserInteraction } from "userInteraction";
import Fieldset from "../Fieldset";

const ManageTaxes = ({}) => {
  const { userInteraction, setUserInteraction } = useUserInteraction();
  const { userData, setUserData } = useUserData();

  const { t, i18n } = useTranslation();

  return (
    <>
      <form id={"manageTaxes"}>
        <div className="form">
          <Fieldset section>
            <div className="screen-header">
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
              <p className="screen-subtitle screen-subtitle--manageTaxes body--small">
                {t("tab_manageTaxes_subtitle")}
              </p>
            </div>
            <Table tableData={sampleTableData} />
            <ManageTaxesCTA />
          </Fieldset>
        </div>
      </form>
    </>
  );
};
export default ManageTaxes;
