import { host } from "settings/config";
export const emailValidator = async (value) => {
  const response = await fetch(
    `${host}/api/v1/users/emailcheck?email=${value.toLowerCase()}`,
    {
      method: "GET",
      cache: "default",
    }
  );
  const json = await response.json();
  return !json.exists;
};

export let isTaxIdValid = true;
export const moneyRegex = /^€ (?=.{1,12}$)(-(?=.*[1-9].*))?(?!0\d)\d{1,12}$/;
export let validators = {
  firstname: /^.{1,72}$/,
  name: /^.{1,72}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  address_street: /\D{1,72}$/,
  address_number: /^([0-9]{1,6})([a-z0-9A-Z]*)?$/,
  address_city: /^(?=.{1,72}$)\D*$/,
  address_postcode: /^([0-9]{5})$/,
  past_address_street: /\D{1,72}$/,
  past_address_number: /^([0-9]{1,6})([a-z0-9A-Z]*)?$/,
  past_address_city: /^(?=.{1,72}$)\D*$/,
  past_address_postcode:
    /^(?=.{5,5}$)([0]{1}[1-9]{1}[0-9]{3})|([1-9]{1}[0-9]{4})$/,
  partner_firstname: /^.{1,72}$/,
  partner_name: /^.{1,72}$/,
  profession: /^[\s\S]{1,200}$/,
  office_address_street: /\D{1,72}$/,
  office_address_number: /^([0-9]{1,6})([a-z0-9A-Z]*)?$/,
  office_address_city: /^(?=.{1,72}$)\D*$/,
  office_address_postcode: /^([0-9]{5})$/,
  steueridentifkationsnummer: /^[0-9]{11}$/,
  steuernummer_value: /^[0-9]{10,11}$/,
  revenue_firstYear: moneyRegex,
  revenue_secondYear: moneyRegex,
  profitFreiberuflerFirstYear: moneyRegex,
  profitFreiberuflerSecondYear: moneyRegex,
  profitGewerbetreibenderFirstYear: moneyRegex,
  profitGewerbetreibenderSecondYear: moneyRegex,
  profitNichtselbstandigerFirstYear: moneyRegex,
  profitNichtselbstandigerSecondYear: moneyRegex,
  profitKapitalvermogenFirstYear: moneyRegex,
  profitKapitalvermogenSecondYear: moneyRegex,
  profitVermietungFirstYear: moneyRegex,
  profitVermietungSecondYear: moneyRegex,
  profitSonstigenFirstYear: moneyRegex,
  profitSonstigenSecondYear: moneyRegex,
  sonderausgabenFirstYear: moneyRegex,
  sonderausgabenSecondYear: moneyRegex,
  steuerabzugsbetrageFirstYear: moneyRegex,
  steuerabzugsbetrageSecondYear: moneyRegex,
  businessBankAccountOwner: /^.{1,128}$/,
  privateBankAccountOwner: /^.{1,128}$/,
};
export const elsterStNrFormatter = {
  // format by Federal state
  1: {
    match: /^([0-9]{3})([0-9]{8})$/,
    replace: "1$10$2",
  },
  11: {
    match: /^([0-9]{2})([0-9]{8})$/,
    replace: "11$10$2",
  },
  21: {
    match: /^([0-9]{2})([0-9]{8})$/,
    replace: "21$10$2",
  },
  22: {
    match: /^([0-9]{2})([0-9]{8})$/,
    replace: "22$10$2",
  },
  23: {
    match: /^([0-9]{2})([0-9]{8})$/,
    replace: "23$10$2",
  },
  24: {
    match: /^([0-9]{2})([0-9]{8})$/,
    replace: "24$10$2",
  },
  26: {
    match: /^0([0-9]{2})([0-9]{8})$/,
    replace: "26$10$2",
  },
  27: {
    match: /^([0-9]{2})([0-9]{8})$/,
    replace: "27$10$2",
  },
  28: {
    match: /^([0-9]{2})([0-9]{8})$/,
    replace: "28$10$2",
  },
  3: {
    match: /^([0-9]{3})([0-9]{8})$/,
    replace: "3$10$2",
  },
  4: {
    // Thüringen && MecklenburgVorpommern
    match: /^([0-9]{3})([0-9]{8})$/,
    replace: "4$10$2",
  },
  5: {
    match: /^([0-9]{3})([0-9]{8})$/,
    replace: "5$10$2",
  },
  9: {
    //both Bayern
    match: /^([0-9]{3})([0-9]{8})$/,
    replace: "9$10$2",
  },
};
