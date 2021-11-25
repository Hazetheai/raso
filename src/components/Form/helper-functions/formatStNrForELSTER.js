import { elsterStNrFormatter } from "../validators";

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
