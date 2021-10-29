/**
 * 
 * @param {number} n Number of years to traverse
 * @param {"before"|"after"} direction 
 * @returns string

 */

export function nYearsFromNow(n, direction) {
  const nYearsFromNow = new Date();
  if (direction === "before") {
    nYearsFromNow.setTime(
      nYearsFromNow.valueOf() - n * 365 * 24 * 60 * 60 * 1000
    );
  } else {
    nYearsFromNow.setTime(
      nYearsFromNow.valueOf() + n * 365 * 24 * 60 * 60 * 1000
    );
  }
  const nYearsFromNowFormatted =
    nYearsFromNow.getFullYear().toString() +
    "-" +
    (nYearsFromNow.getMonth() + 1).toString() +
    "-" +
    nYearsFromNow.getDate();

  return nYearsFromNowFormatted;
}
