import qs from "qs";
import { accountableApp, wpHost } from "settings/config";

export const emailValidator = async (value) => {
  try {
    const response = await fetch(
      `${accountableApp}/api/v1/users/emailcheck?email=${value.toLowerCase()}`,
      {
        method: "GET",
        cache: "default",
      }
    );

    const json = await response.json();
    return !json.exists;
  } catch (err) {
    return "Dieses Feld ist ungültig";
  }
};
export const taxIdValidator = async (value) => {
  try {
    const response = await fetch(`${wpHost}/raso-api/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: qs.stringify({ taxId: value }),
    });

    const json = await response.json();
    return json.valid || "Dieses Feld ist ungültig";
  } catch (err) {
    return navigator?.language.slice(0, 2) === "en"
      ? "There was an error validating the Tax ID. Please try again later"
      : "Es ist ein Fehler bei der Validierung der Steuer-ID aufgetreten. Bitte versuchen Sie es später erneut";
  }
};

export let isTaxIdValid = true;
export const moneyRegex = /(\d*)(?:\.?)(\d+),?(\d{0,2}) ?€?$/;
export const validators = {
  firstname: /^.{1,72}$/,
  name: /^.{1,72}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  address_street: /\w{1,72}$/,
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

export function isValidIBANNumber(input) {
  if (input === "") return 1; //empty ok
  var CODE_LENGTHS = {
    AD: 24,
    AE: 23,
    AT: 20,
    AZ: 28,
    BA: 20,
    BE: 16,
    BG: 22,
    BH: 22,
    BR: 29,
    CH: 21,
    CR: 21,
    CY: 28,
    CZ: 24,
    DE: 22,
    DK: 18,
    DO: 28,
    EE: 20,
    ES: 24,
    FI: 18,
    FO: 18,
    FR: 27,
    GB: 22,
    GI: 23,
    GL: 18,
    GR: 27,
    GT: 28,
    HR: 21,
    HU: 28,
    IE: 22,
    IL: 23,
    IS: 26,
    IT: 27,
    JO: 30,
    KW: 30,
    KZ: 20,
    LB: 28,
    LI: 21,
    LT: 20,
    LU: 20,
    LV: 21,
    MC: 27,
    MD: 24,
    ME: 22,
    MK: 19,
    MR: 27,
    MT: 31,
    MU: 30,
    NL: 18,
    NO: 15,
    PK: 24,
    PL: 28,
    PS: 29,
    PT: 25,
    QA: 29,
    RO: 24,
    RS: 22,
    SA: 24,
    SE: 24,
    SI: 19,
    SK: 24,
    SM: 27,
    TN: 24,
    TR: 26,
  };
  var iban = String(input)
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, ""), // keep only alphanumeric characters
    code = iban.match(/^(DE)(\d{2})([A-Z\d]+)$/), // match and capture (1) the country code, (2) the check digits, and (3) the rest
    digits;
  // check syntax and length
  if (!code || iban.length !== CODE_LENGTHS[code[1]]) {
    return false;
  }
  // rearrange country code and check digits, and convert chars to ints
  digits = (code[3] + code[1] + code[2]).replace(/[A-Z]/g, function (letter) {
    return letter.charCodeAt(0) - 55;
  });
  // final check
  return mod97(digits);
}

function mod97(string) {
  var checksum = string.slice(0, 2),
    fragment;
  for (var offset = 2; offset < string.length; offset += 7) {
    fragment = String(checksum) + string.substring(offset, offset + 7);
    checksum = parseInt(fragment, 10) % 97;
  }
  return checksum;
}

function validateValue(k, v, fields) {
  switch (k) {
    case "steuernummer_value":
      return elsterStNrFormatter[fields.steuernummer_state].match.test(
        v.trim().replace(/\/|\s/g, "")
      );
    case "steueridentifkationsnummer":
      return isTaxIdValid;
    case "phone":
      return /^\+\d{11,15}$/.test(v.trim().replace(/\s/g, ""));
    default:
      if (validators[k]) return validators[k].test(v.trim());
      else return true;
  }
}
