import produce from "immer";
import React, { createContext, useContext, useEffect, useState } from "react";

const UserDataContext = createContext();

const useUserData = () => {
  return useContext(UserDataContext);
};

const UserDataProvider = ({ children }) => {
  const [userData, setUserDataHook] = useState({
    uxFields: {
      startedFilling: false,
    },
    // Personal
    personalFields: {
      firstname: "",
      name: "",
      email: "",
      phone: "+49 ",
      gender: "choose",
      birthdate: { d: "", m: "", y: "" },
      address_street: "",
      address_number: "",
      address_city: "",
      address_postcode: "",
      religion: "choose",
      maritalstatus: "001", // edit here
      maritalstatusdate: { d: "", m: "", y: "" },
      partner_firstname: "",
      partner_name: "",
      partner_gender: "choose",
      partner_birthdate: { d: "", m: "", y: "" },
      partner_religion: "choose",
      moved: "no",
      past_address_street: "",
      past_address_number: "",
      past_address_city: "",
      past_address_postcode: "",
      movingdate: { d: "", m: "", y: "" },
      optin: true,
    },
    // Business
    businessFields: {
      profession: "",
      officeaddress: "no",
      office_address_street: "",
      office_address_number: "",
      office_address_city: "",
      office_address_postcode: "",
      previousbusiness: "no",
    },
    // Tax Info
    taxInfoFields: {
      steueridentifkationsnummer: "",
      steuernummer: "no",
      steuernummer_value: "",
      steuernummer_state: "choose",
      singleentry: "yes",
      startdate: { d: "", m: "", y: "" },
      revenue_firstYear: "",
      revenue_secondYear: "",
      chargeVAT: "",
      askVATnumber: "",
    },
    // Tax Estimate
    taxEstimateFields: {
      profitFreiberufler: "no",
      profitFreiberuflerFirstYear: "",
      profitFreiberuflerSecondYear: "",
      profitGewerbetreibender: "no",
      profitGewerbetreibenderFirstYear: "",
      profitGewerbetreibenderSecondYear: "",
      profitNichtselbstandiger: "no",
      profitNichtselbstandigerFirstYear: "",
      profitNichtselbstandigerSecondYear: "",
      profitKapitalvermogen: "no",
      profitKapitalvermogenFirstYear: "",
      profitKapitalvermogenSecondYear: "",
      profitVermietung: "no",
      profitVermietungFirstYear: "",
      profitVermietungSecondYear: "",
      profitSonstigen: "no",
      profitSonstigenFirstYear: "",
      profitSonstigenSecondYear: "",
      profitAgriculture: "no",
      taxPrepayment: "no",
      sonderausgabenFirstYear: "",
      sonderausgabenSecondYear: "",
      steuerabzugsbetrageFirstYear: "",
      steuerabzugsbetrageSecondYear: "",
    },
    // Bank Account
    bankAccountFields: {
      showBusinessBankAccount: "no",
      businessIban: "",
      businessBankAccountOwner: "",
      businessBankAccountOwnerCategory: "1",
      showPersonalBankAccount: "no",
      privateIban: "",
      privateBankAccountOwner: "",
      personalBankAccountOwnerCategory: "1",
    },
    // Review
    reviewFields: {
      taxOffice: "choose",
      version: "a",
      finanzamtLetters: [],
    },
  });

  useEffect(() => {
    const sessionUserData = JSON.parse(localStorage.getItem("userData"));
    if (sessionUserData) setUserDataHook(sessionUserData);
  }, []);

  /**
   *
   * @param {*} newUserData
   * @param {"personalFields"|"businessFields"|"taxInfoFields"|"taxEstimateFields"|"bankAccountFields"|"reviewFields"} dataSection
   * @param {boolean} save
   */
  const setUserData = (newUserData, dataSection, save = false) => {
    const newData = produce(userData, (draft) => {
      draft[dataSection] = { ...draft[dataSection], ...newUserData };
    });
    if (save) {
      localStorage.setItem("userData", JSON.stringify(newData));
    }

    setUserDataHook(newData);
  };
  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};

export { UserDataContext, useUserData, UserDataProvider };
