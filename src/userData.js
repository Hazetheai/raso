import React, { useContext, createContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { sendAmplitudeData } from "./res/amplitude";
import qs from "querystring";
import produce from "immer";

const UserDataContext = createContext();

const useUserData = () => {
  return useContext(UserDataContext);
};

const UserDataProvider = ({ children }) => {
  const [userData, setUserDataHook] = useState({
    // Personal
    personalFields: {
      firstname: "",
      name: "",
      email: "",
      phone: "+49 ",
      gender: "",
      birthdate: { d: "", m: "", y: "" },
      address_street: "",
      address_number: "",
      address_city: "",
      address_postcode: "",
      religion: "",
      maritalstatus: "", // edit here
      maritalstatusdate: { d: "", m: "", y: "" },
      partner_firstname: "",
      partner_name: "",
      partner_gender: "",
      partner_birthdate: { d: "", m: "", y: "" },
      partner_religion: "",
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
      steuernummer_state: "",
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
      taxOffice: "",
      optin: true,
      version: "a",
      finanzamtLetters: [],
    },
  });
  const location = useLocation();
  useEffect(() => {
    const sessionUserData = JSON.parse(localStorage.getItem("userData"));
    if (sessionUserData) setUserData(sessionUserData);
    const usable =
      location.search[0] === "?" ? location.search.slice(1) : location.search;
    const params = qs.parse(usable);
    // if (params.r) {
    //   // promocode
    //   setUserData({ ...userData, promocode: params.r }, true);
    //   sendAmplitudeData('WEB_SIGNUP_USEDPROMOCODELINK', {
    //     promocode: params.r,
    //   });
    // }
    // if (params.token) {
    //   try {
    //     const data = JSON.parse(atob(params.token.replace(/\u200B/g, '')));
    //     sendAmplitudeData('WEB_SIGNUP_SOURCE_AFFILATE', {
    //       source: 'HelloBank',
    //       id: data?.Uuid,
    //       timestamp: data?.TimeStamp,
    //       marketplaceitem: data?.MarketPlaceItem,
    //     });
    //   } catch (e) {
    //     console.error('Parsing error:', e);
    //   }
    // }
    // if (params.d) {
    //   // if url user data
    //   try {
    //     const data = JSON.parse(atob(params.d.replace(/\u200B/g, '')));
    //     const newUserDate = {
    //       // TODO: type this!
    //       rasoRef: data.rasoRef,
    //       fullName: `${data.firstName} ${data.lastName}`,
    //       accountType:
    //         data.accountType === 'freiberufler_principal_vat'
    //           ? 'freiberufler_principal_vat'
    //           : 'gewerbetreibender_principal',
    //       VATType: data.VATType === 'subjectToVAT' ? 'subjectToVAT' : 'noVAT',
    //       ...(data.noVATStatus && { noVATStatus: 'franchisee' }),
    //       ...(data.VATReturnFrequency && {
    //         VATReturnFrequency: data.VATReturnFrequency,
    //       }),
    //       email: data.email,
    //       phoneNumber: data.phoneNumber,
    //     };
    //     setUserData({
    //       ...userData,
    //       ...newUserDate,
    //     });
    //   } catch (e) {
    //     console.error('Parsing error:', e);
    //   }
    // }
  }, [location.search]);

  /**
   *
   * @param {*} newUserData
   * @param {"personalFields"|"businessFields"|"taxInfoFields"|"taxEstimateFields"|"bankAccountFields"|"reviewFields"} dataSection
   * @param {boolean} save
   */
  const setUserData = (newUserData, dataSection, save = false) => {
    if (save) {
      localStorage.setItem(
        "userData",
        JSON.stringify(
          produce((draft) => {
            draft[dataSection] = newUserData;
          })
        )
      );
    }

    setUserDataHook(
      produce((draft) => {
        draft[dataSection] = newUserData;
      })
    );
  };
  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};

export { UserDataContext, useUserData, UserDataProvider };
