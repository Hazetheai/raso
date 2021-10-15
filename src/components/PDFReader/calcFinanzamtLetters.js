import letterData from "res/letterData.json";

function calcFinanzamtLetters(userData) {
  const isMarried = ["002", "003"].includes(userData.maritalstatus);
  let letters = [];
  if (isMarried) {
    letters = letters
      .concat(letterData["married_letters"])
      .filter((el) => !/single_letters/g.test(el.pdf_url))
      .filter((item, pos, arr) => arr.indexOf(item) === pos);
  } else {
    letters = letters
      .concat(letterData["single_letters"])
      .filter((el) => !/married_letters/g.test(el.pdf_url))
      .filter((item, pos, arr) => arr.indexOf(item) === pos);
  }

  if (userData.askVATnumber) {
    letters = letters
      .concat(letterData["with_vat_letters"])
      .filter((item, pos, arr) => arr.indexOf(item) === pos);
  } else {
    letters = letters
      .filter((el) => !/vat_letter/g.test(el.pdf_url))
      .filter((item, pos, arr) => arr.indexOf(item) === pos);
  }

  return letters;
}

export default calcFinanzamtLetters;
