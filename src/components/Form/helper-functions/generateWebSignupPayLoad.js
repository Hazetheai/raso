/**
 *
 * @param {string} ticket
 * @param {Object} userData User Data Fields
 * @returns
 */

export function generateWebSignupPayLoad(ticket, userData) {
  const payload = {
    rasoRef: ticket,
    firstName: userData.personalFields.firstname,
    lastName: userData.personalFields.name,
    email: userData.personalFields.email,
    phoneNumber: userData.personalFields.phone,
  };
  if (userData.taxEstimateFields.profitGewerbetreibender)
    payload["accountType"] = "gewerbetreibender_principal";
  else payload["accountType"] = "freiberufler_principal_vat";

  if (userData.taxInfoFields.chargeVAT) {
    payload["VATReturnFrequency"] = "monthly";
    payload["VATType"] = "subjectToVAT";
  } else {
    //klein
    payload["VATReturnFrequency"] = "quarterly";
    payload["VATType"] = "noVAT";
    payload["noVATStatus"] = "franchisee";
  }
  const b64 = btoa(JSON.stringify(payload))
    .replace(/\+/g, "-") // Convert '+' to '-'
    .replace(/\//g, "_") // Convert '/' to '_'
    .replace(/=+$/, "");

  return b64;
}
