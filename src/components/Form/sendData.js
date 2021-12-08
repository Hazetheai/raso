import qs from "qs";
import { gtagEvent } from "res/gtag";
import { cleanLocal } from "res/lib";
import { fbLogEvent } from "res/pixel";
import { dlAppLink, wpHost } from "settings/config";
import { formatforAPICall } from "./helper-functions/data-shaping";
import { generateWebSignupPayLoad } from "./helper-functions/generateWebSignupPayLoad";
import { getNextVATDeadline } from "./helper-functions/getNextVATDeadline";

export async function sendForm({
  fields,
  sLang,
  sPartner,
  preview,
  successPageVersion,
  videoSection,
}) {
  const usecase = "send";
  // TODO
  gtagEvent("RASO_SEND_FORM-ITER-1", {
    version: `12/10/2021_${successPageVersion}`,
    video: `12/10/2021_${videoSection}`,
  });
  if (preview)
    return await apiCall(
      fields,
      sLang,
      sPartner,
      preview,
      usecase,
      successPageVersion
    );
}

export async function previewForm({
  fields,
  sLang,
  sPartner,
  preview,
  successPageVersion,
}) {
  const usecase = "validate";
  // TODO
  gtagEvent("RASO_PREVIEW_FORM-ITER-1");
  return await apiCall(
    fields,
    sLang,
    sPartner,
    preview,
    usecase,
    successPageVersion
  );
}

/**
 *
 * @param {Object} fields User Data
 * @param {"en"|"de"} lang User Language
 * @param {string} partner Partner Name
 * @param {boolean} preview Is this a preview?
 * @param {"subscribe"|"validate"|"send"} usecase API Use Case
 * @param {"a"|"b"} successPageVersion
 * @returns
 */
async function apiCall(
  fields,
  lang,
  partner,
  preview,
  usecase,
  successPageVersion
) {
  const apiResponse = {};

  const sLang = lang;
  const sPartner = partner;

  const sendFields = Object.assign({}, formatforAPICall(fields));

  try {
    console.log(`sendFields`, sendFields);
    const response = await window.fetch(wpHost + "/raso-api/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: qs.stringify({
        fields: sendFields,
        usecase,
        sLang,
        sPartner,
      }),
    });
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }

    apiResponse["data"] = await response.json();
    console.log(`apiResponse`, apiResponse);
    apiResponse["success"] = apiResponse["data"]?.success;
  } catch (error) {
    console.log(`apiResponse`, apiResponse);
    console.error(`error sending form-fields`, error);
  }

  // On success
  if (apiResponse["data"]?.success) {
    preview = true;
    // On Validation
    if (usecase === "validate") {
      // preview
      apiResponse["previewLink"] =
        wpHost + "/r/?t=" + apiResponse["data"].data.ticket;
    } else {
      // On Submission
      apiResponse["ticketId"] = apiResponse["data"].data.ticket;

      const downloadAppLink = `https://onboarding.accountable.de/${
        sLang === "en" ? "en/" : ""
      }raso?d=${generateWebSignupPayLoad(
        apiResponse["data"].data.ticket,
        fields
      )}&utm_content=${successPageVersion}`;

      apiResponse["downloadAppLink_desktop"] = downloadAppLink;
      apiResponse["downloadAppLink_mobile"] = dlAppLink;
      apiResponse["showHeader"] = true;
      apiResponse["nextVatDeadline"] = getNextVATDeadline(fields, lang);
      window.scrollTo(0, 0);

      fbLogEvent("trackCustom", "TaxIdRegistrationLead");
      cleanLocal();
    }
  }

  if (!apiResponse["data"]?.success) {
    apiResponse["success"] = false;
    apiResponse["code"] = apiResponse["data"]?.code;
    apiResponse["message"] = apiResponse["data"]?.message;
    preview = false;
  }
  return apiResponse;
}
