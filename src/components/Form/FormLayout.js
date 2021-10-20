import Tabs, { sampleTabData } from "components/Tabs";
import React from "react";
import Personal from "./Personal";
import "./form-layout.css";

function handleTabClick(id) {
  console.log(id);
}

const FormLayout = () => {
  return (
    <div className="form-layout">
      <Tabs
        tabData={sampleTabData}
        completeTabs={["raso_tab-0", "raso_tab-1"]}
        activeTab="raso_tab-2"
        onTabClick={handleTabClick}
      />
      <Personal nextStep={() => console.log("Next Step")} />
    </div>
  );
};

export default FormLayout;
