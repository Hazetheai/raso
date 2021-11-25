import produce from "immer";
import { flatten2DObject, sanitizeNumbers } from "res/lib";
import { formatStNrForELSTER } from "./formatStNrForELSTER";

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
    if (/\bno\b|001/i.test(entry[1])) {
      obj[entry[0]] = false;
    } else if (/\byes\b/i.test(entry[1])) {
      obj[entry[0]] = true;
    }
  });

  return obj;
}
function formatGender(obj) {
  Object.entries(obj).forEach((entry) => {
    if (/\bfemale/gi.test(entry[1])) {
      obj[entry[0]] = 2;
    }
    if (/\bmale\b/gi.test(entry[1])) {
      obj[entry[0]] = 1;
    }
  });

  return obj;
}

function formatNumbers(obj) {
  Object.entries(obj).forEach((entry) => {
    // Is Money
    if (typeof entry[1] === "string" && /€/gi.test(entry[1])) {
      obj[entry[0]] = sanitizeNumbers(entry[1], true);
    } else if (
      typeof entry[1] === "string" &&
      /^[0-9]+(\.|,)?[0-9]*/.test(entry[1])
    ) {
      // Is number-as-string (preserve "0" str padding etc)
      obj[entry[0]] = entry[1].replace(/\D/gi, "");
    } else {
      obj[entry[0]] = entry[1];
    }
  });
  return obj;
}

function formatStrNumber(obj) {
  if (obj.steuernummer_value)
    obj.steuernummer_value = formatStNrForELSTER(
      obj.steuernummer_value,
      obj.steuernummer_state
    );

  return obj;
}

function formatFreelanceOrCommercial(obj) {
  const {
    profitFirstYear,
    profitSecondYear,
    freiberufler_oder_gewerbetreibender,
  } = obj;
  if (freiberufler_oder_gewerbetreibender === "freelancer") {
    obj["profitFreiberufler"] = "yes";
    obj["profitFreiberuflerFirstYear"] = profitFirstYear;
    obj["profitFreiberuflerSecondYear"] = profitSecondYear;
  }
  if (freiberufler_oder_gewerbetreibender === "commercial") {
    obj["profitGewerbetreibender"] = "yes";
    obj["profitGewerbetreibenderFirstYear"] = profitFirstYear;
    obj["profitGewerbetreibenderSecondYear"] = profitSecondYear;
  }

  return obj;
}

/**
 *
 * @param {Object} obj Raw User Data
 * @returns Object - Flattened User Data
 * @description Pass in raw user data (from context) and receive formatted for Elster Api Wrapper
 */
export const formatforAPICall = (obj) => {
  return formatStrNumber(
    formatNumbers(
      formatGender(
        formatDates(
          formatYesNo(formatFreelanceOrCommercial(flatten2DObject(obj)))
        )
      )
    )
  );
};

export const formatDatasection = (obj) => formatDates(obj);
export const reFormatForFormData = (obj) => reFormatDates(obj);
