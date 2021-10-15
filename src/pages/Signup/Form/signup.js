import { setIntercomSettings } from "../../../res/intercom";
import {
  sendAmplitudeData,
  setAmplitudeUserId,
  setAmplitudeUserProperties,
} from "../../../res/amplitude";
import { FAlogEvent } from "../../../res/fpc";
import { logEvent } from "../../../res/pixel";
import { country, host } from "../../../settings/config";
import { getUtms } from "../../../res/utms";
import { tap } from "../../../res/tapfiliate";
import { GTMsendEvent } from "../../../res/gtag";

const languageMap = {
  en: 0,
  fr: 1,
  nl: 2,
  de: 3,
};
const countryToString = {
  be: {
    0: "Belgium",
    1: "Belgique",
    2: "Belgie",
  },
  de: {
    0: "Germany",
    3: "Deutschland",
  },
};

export const signup = async (data) => {
  const commonDataFormat = ({ VATType, ...data }) => {
    return {
      country: country,
      email: data.email,
      firstName: data.fullName.split(" ")[0],
      lastName: data.fullName.substr(data.fullName.indexOf(" ") + 1),
      password: data.password,
      accountType: `${data.accountType}${
        data.occupation ? data.occupation : ""
      }`,
      phoneNumber: data.phoneNumber,
      language: languageMap[data.language],
      VATType: VATType
        ? VATType === "subjectToVAT"
          ? VATType
          : data.noVATStatus
          ? data.noVATStatus
          : VATType
        : "subjectToVAT",
    };
  };
  const countriesDataFormat = {
    de: ({ VATReturnFrequency }) => {
      return {
        VATReturnFrequency: VATReturnFrequency,
        address: {
          country: countryToString[country][languageMap[data.language]],
        },
      };
    },
    be: ({
      VATNumber,
      promocode,
      complementaryDays,
      NACECodes,
      city,
      zipcode,
      street,
      startDate,
      companyName,
    }) => {
      return {
        ...(VATNumber && { VATNumber: VATNumber.replace(/\.| /g, "") }),
        ...(promocode && { promocode: promocode }),
        ...(companyName && { companyName }),
        ...(complementaryDays && { complementaryDays }),
        ...(complementaryDays && { complementaryDays }),
        ...(NACECodes && {
          NACECodes: Object.values(NACECodes).map((nc) => nc[0]),
        }),
        address: {
          ...(city && { city }),
          ...(zipcode && { zip: zipcode }),
          ...(street && { street }),
          country: countryToString[country][languageMap[data.language]],
        },
        ...(startDate && { startDate }),
      };
    },
  };
  const user = {
    ...commonDataFormat(data),
    ...countriesDataFormat[country](data),
  };

  const response = await fetch(`${host}/api/v1/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user }),
  });

  const json = await response.json();
  const utms = getUtms();

  if (json._id) {
    setIntercomSettings(json, data.language);
    sendAmplitudeData("WEB_SIGNUP_CREATEDACCOUNT");
    setAmplitudeUserId(data.email);
    setAmplitudeUserProperties({
      user_country: json.country,
      VAT_type: json.VATType,
      account_type: `${data.accountType}${
        data.occupation ? data.occupation : ""
      }`,
      account_type: json.account_type,
      phoneNumber: json.phoneNumber,
      email: json.email,
      firstName: json.firstName,
      lastName: json.lastName,
      language: json.language,
      ...(json.VATNumber && { VATNumber: json.VATNumber }),
      ...(json.companyName && { companyName: json.companyName }),
      ...(json.NACECodes && {
        NACE_main: JSON.stringify(
          Object.values(json.NACECodes).map((nc) => nc[0])
        ).slice(1, -1),
      }),
      ...(json.startDate && {
        KBO_start_date: new Date(json.startDate).getTime() / 1000,
      }),
      ...(json.address && json.address),
      utms,
      ...utms,
    });
    console.log(json);
    if (user.promocode)
      sendAmplitudeData("WEB_SIGNUP_SIGNEDUPWITHPROMOCODE", {
        promocode: user.promocode,
      });
    logEvent("CreatedAccount");
    GTMsendEvent("createdAccount", json._id);
    tap("conversion", json._id);
    if (country === "de") FAlogEvent("sale", json._id);
    return true;
  } else return false;
};
