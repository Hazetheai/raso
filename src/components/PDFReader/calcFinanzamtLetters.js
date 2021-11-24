import letterData from "res/letterData.json";

function calcFinanzamtLetters(userData) {
  const isMarried = ["002", "003"].includes(userData.maritalstatus);
  let letters = [];
  if (isMarried) {
    letters = letters
      .concat(letterData["married_letters"])
      .filter((el) => !/single_letters/g.test(el.pdf_url));
  } else {
    letters = letters
      .concat(letterData["single_letters"])
      .filter((el) => !/married_letters/g.test(el.pdf_url));
  }

  if (userData.askVATnumber) {
    letters = letters.concat(letterData["with_vat_letters"]);
  } else {
    letters = letters.filter((el) => !/vat_letter/g.test(el.pdf_url));
  }
  // Remove Dupes
  return letters.filter((item, pos, arr) => arr.indexOf(item) === pos);
}

export default calcFinanzamtLetters;
