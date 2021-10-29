import produce from "immer";
import { elsterStNrFormatter } from "./validators";

export function formatStNrForELSTER(stnr, taxOffice) {
  if (taxOffice.charAt(0) === "2" || taxOffice.substring(0, 2) === "11") {
    return stnr
      .replace(/\/|\s/g, "")
      .replace(
        elsterStNrFormatter[taxOffice.substring(0, 2)].match,
        elsterStNrFormatter[taxOffice.substring(0, 2)].replace
      );
  } else {
    return stnr
      .replace(/\/|\s/g, "")
      .replace(
        elsterStNrFormatter[taxOffice.charAt(0)].match,
        elsterStNrFormatter[taxOffice.charAt(0)].replace
      );
  }
}

export function setNextVATDeadline(userData, lang) {
  const formatter = new Intl.DateTimeFormat(lang, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const { d, m, y } = userData.taxInfoFields.startdate;
  let nextVATDeadline = new Date(y, parseInt(m, 10) - 1, d);
  if (nextVATDeadline < new Date()) nextVATDeadline = new Date();

  if (nextVATDeadline.getDate() > 10) {
    nextVATDeadline.setMonth(nextVATDeadline.getMonth() + 1);
  }
  nextVATDeadline.setDate(10);
  // TODO Set Vat Deadline in Success Header
  document.querySelector("#nextVATDeadline").innerHTML =
    formatter.format(nextVATDeadline);

  // TODO Set Vat Deadline in Success Header
  if (userData.taxInfoFields.chargeVAT)
    document.querySelector("#rasoSubmittedSubjectToVAT").style.display =
      "block";
}

/**
 *
 * @param {string} ticket
 * @param {Object} fields User Data Fields
 * @returns
 */

export function generateWebSignupPayLoad(ticket, fields) {
  const payload = {
    rasoRef: ticket,
    firstName: fields.personalFields.firstname,
    lastName: fields.personalFields.name,
    email: fields.personalFields.email,
    phoneNumber: fields.personalFields.phone,
  };
  if (fields.taxEstimateFields.profitGewerbetreibender)
    payload.accountType = "gewerbetreibender_principal";
  else payload.accountType = "freiberufler_principal_vat";

  if (fields.taxInfoFields.chargeVAT) {
    payload.VATReturnFrequency = "monthly";
    payload.VATType = "subjectToVAT";
  } else {
    //klein
    payload.VATReturnFrequency = "quarterly";
    payload.VATType = "noVAT";
    payload.noVATStatus = "franchisee";
  }
  const b64 = btoa(JSON.stringify(payload))
    .replace(/\+/g, "-") // Convert '+' to '-'
    .replace(/\//g, "_") // Convert '/' to '_'
    .replace(/=+$/, "");

  return b64;
}

/**
 *
 * @param {number} n Number to Wrap
 * @param {number} min Minimum Value
 * @param {number} max Maximum Value
 * @returns {number}
 */
export function wrap(n, min, max) {
  if (typeof n !== "number") n = sanitizeNumbers(n);

  if (n < min) return max;
  if (n > max) return min;

  return n;
}

/**
 *
 * @param {string|number} string
 * @returns
 */
export function sanitizeNumbers(string) {
  if (typeof string === "number") return string;
  return parseInt(`${string}`.replace(/\D/g, ""), 10);
}

function formatDates(obj) {
  Object.entries(obj).forEach((entry) => {
    if (/\d\d\.\d\d\.\d\d\d\d/g.test(entry[1])) {
      const dateSections = entry[1].split(".");
      obj[entry[0]] = {
        d: dateSections[0],
        m: dateSections[1],
        y: dateSections[2],
      };
    }
  });

  return obj;
}

function reFormatDates(obj) {
  const newObj = produce(obj, (draft) => {
    Object.entries(draft).forEach((entry) => {
      if (entry[1].d && entry[1].m && entry[1].y) {
        draft[entry[0]] = `${entry[1].d}.${entry[1].m}.${entry[1].y}`;
      } else if (entry[1].d === "" && entry[1].m === "" && entry[1].y === "") {
        draft[entry[0]] = ``;
      }
    });
  });

  return newObj;
}

function formatYesNo(obj) {
  Object.entries(obj).forEach((entry) => {
    if (/\bno\b/i.test(entry[1])) {
      obj[entry[0]] = false;
    } else if (/\byes\b/i.test(entry[1])) {
      obj[entry[0]] = true;
    }
  });

  return obj;
}

export const formatDatasection = (obj) => formatDates(obj);
export const reFormatForFormData = (obj) => reFormatDates(obj);
