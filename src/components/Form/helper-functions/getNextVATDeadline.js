export function getNextVATDeadline(userData, lang) {
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

  return {
    vatDeadline: formatter.format(nextVATDeadline),
    showChargeVat: !!userData.taxInfoFields.chargeVAT,
  };
}
