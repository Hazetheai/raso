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
      moved: false,
      past_address_street: "",
      past_address_number: "",
      past_address_city: "",
      past_address_postcode: "",
      movingdate: { d: "", m: "", y: "" },
    },
    // Business
    businessFields: {
      profession: "",
      officeaddress: false,
      office_address_street: "",
      office_address_number: "",
      office_address_city: "",
      office_address_postcode: "",
      previousbusiness: false,
    },
    // Tax Info
    taxInfoFields: {
      steueridentifkationsnummer: "",
      steuernummer: false,
      steuernummer_value: "",
      steuernummer_state: "choose",
      singleentry: true,
      startdate: { d: "", m: "", y: "" },
      revenue_firstYear: "",
      revenue_secondYear: "",
      chargeVAT: "",
      askVATnumber: "",
    },
    // Tax Estimate
    taxEstimateFields: {
      profitFreiberufler: false,
      profitFreiberuflerFirstYear: "",
      profitFreiberuflerSecondYear: "",
      profitGewerbetreibender: false,
      profitGewerbetreibenderFirstYear: "",
      profitGewerbetreibenderSecondYear: "",
      profitNichtselbstandiger: false,
      profitNichtselbstandigerFirstYear: "",
      profitNichtselbstandigerSecondYear: "",
      profitKapitalvermogen: false,
      profitKapitalvermogenFirstYear: "",
      profitKapitalvermogenSecondYear: "",
      profitVermietung: false,
      profitVermietungFirstYear: "",
      profitVermietungSecondYear: "",
      profitSonstigen: false,
      profitSonstigenFirstYear: "",
      profitSonstigenSecondYear: "",
      profitAgriculture: false,
      taxPrepayment: false,
      sonderausgabenFirstYear: "",
      sonderausgabenSecondYear: "",
      steuerabzugsbetrageFirstYear: "",
      steuerabzugsbetrageSecondYear: "",
    },
    // Bank Account
    bankAccountFields: {
      showBusinessBankAccount: false,
      businessIban: "",
      businessBankAccountOwner: "",
      businessBankAccountOwnerCategory: "1",
      showPersonalBankAccount: false,
      privateIban: "",
      privateBankAccountOwner: "",
      personalBankAccountOwnerCategory: "1",
    },
    // Review
    reviewFields: {
      taxOffice: "choose",
      optin: true,
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
      draft[dataSection] = newUserData;
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
