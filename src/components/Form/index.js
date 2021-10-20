import React, { useState, Fragment, useEffect } from "react";
import "./form.css";
import Personal from "./Personal";
import Business from "./Business";
import Start from "./Start";
import Tabs from "./Tabs";
import { Redirect } from "react-router-dom";
import { useUserData } from "userData";
import { country, host } from "settings/config";
import { useTranslation } from "react-i18next";
import { setIntercomEmail } from "res/intercom";
import { setAmplitudeUserId } from "res/amplitude";
import { emailValidator } from "./validators";
import { signup } from "./signup";

const Form = () => {
  const { userData, setUserData } = useUserData(); //set UserData for thank you modal
  const [step, setStep] = useState(0); //display this step
  const [status, setStatus] = useState(""); // status either loading/failed/empty/redirect
  const [businessInfoList, setbusinessInfoList] = useState([]);
  const [formData, setFormData] = useState({}); // Contains all the form data from the steps
  const { t } = useTranslation();
  useEffect(() => {
    if (userData.rasoRef) {
      (async () => {
        const emailExists = await emailValidator(userData.email);
        if (!emailExists) setStatus("redirect");
        return;
      })();
    }
    if (userData.promocode)
      setFormData({ ...formData, pomocode: userData.promocode });
  }, [userData]);

  /**
   *
   * @param {*} data
   * @param {"personalFields"|"businessFields"|"taxInfoFields"|"taxEstimateFields"|"bankAccountFields"|"reviewFields"} dataSection
   */

  const nextStep = async (data, dataSection) => {
    // Go to next step if last step submit to backend
    const newData = { ...formData, ...data, language: t("current_language") };
    // setFormData(newData);

    setUserData(data, dataSection, true);

    if (step + 1 < steps.length) {
      if (step === 0) {
        setIntercomEmail(data.email, t("current_language"));
        setAmplitudeUserId(data.email);
      }

      setStep(step + 1);
    } else {
      setStatus("loading");
      // TODO Do we want to check if they have signed up with us before?
      // const emailExists = await emailValidator(newData.email);
      // if (!emailExists) {
      //   setStatus("redirect");
      //   return;
      // }
      // const signedUp = await signup(newData);

      // if (signedUp) setStatus("redirect");
      // else setStatus("failed");
    }
  };
  const steps = [
    <Personal nextStep={nextStep} />,
    <Business
      nextStep={nextStep}
      businessInfoList={businessInfoList}
      formData={formData}
      disabled={status === "loading" ? true : false}
      error={status === "failed" ? true : false}
    />,
  ];
  const getBusinessInfo = async (name) => {
    const response = await fetch(
      `${host}/api/v1/search-enterprises?name=${name}`
    );
    return await response.json();
  };
  return (
    <>
      <Tabs step={step} />

      {steps[step]}

      {status === "redirect" && (
        <Redirect
          to={country === "de" ? t("thank_you_page_de") : t("thank_you_page")}
        />
      )}
    </>
  );
};
export default Form;
