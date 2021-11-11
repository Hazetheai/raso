import qs from "qs";
import { wpHost } from "settings/config";
import {
  formatforAPICall,
  generateWebSignupPayLoad,
  getNextVATDeadline,
} from "./helpers";

export async function sendForm({ fields, sLang, sPartner, preview }) {
  const usecase = "send";
  // TODO
  // GTMsendEvent("RASO_SEND_FORM", {
  //   version: `12/10/2021_${fields.version}`,
  // });
  if (preview) return await apiCall(fields, sLang, sPartner, preview, usecase);
}

export async function previewForm({ fields, sLang, sPartner, preview }) {
  const usecase = "validate";
  // TODO
  // GTMsendEvent("RASO_PREVIEW_FORM");
  return await apiCall(fields, sLang, sPartner, preview, usecase);
}

/**
 *
 * @param {Object} fields User Data
 * @param {"en"|"de"} lang User Language
 * @param {string} partner Partner Name
 * @param {boolean} preview Is this a preview?
 * @param {"subscribe"|"validate"|"send"} usecase API Use Case
 * @returns
 */
async function apiCall(fields, lang, partner, preview, usecase) {
  const apiResponse = {};
  //   Run Validator Functions
  let isValid = true;
  // TODO Move these bcak to screen sections
  if (!isValid) {
    apiResponse["success"] = false;
    return apiResponse;
  }

  // TODO Enter Loading State
  // document.querySelector("#estirevLoading").style.display = "block";
  // document.querySelector("#erBox").style.display = "none";
  // document.querySelector("#erSN").style.display = "none";
  // document.querySelector("#erBoxErrors").innerHTML = "";
  const sLang = lang;
  const sPartner = partner;
  // toggleForm(); Hide The Form

  // TODO Format Fields for API
  const sendFields = Object.assign({}, formatforAPICall(fields));
  //   const sendFields = Object.assign({}, dummy_data);

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
    apiResponse["success"] = apiResponse["data"].success;
  } catch (error) {
    console.error(`error sending form-fields`, error);
  }

  // On success
  if (apiResponse["data"].success) {
    preview = true;
    // On Validation
    if (usecase === "validate") {
      // preview
      //   TODO Create preview Link
      //   document.querySelector("#previewLink").href =
      //     "/r/?t=" + data.data.ticket;
      apiResponse["previewLink"] =
        wpHost + "/r/?t=" + apiResponse["data"].data.ticket;
      //   document.querySelector("#previewLink").style.display = "inline-block";
      //   document.querySelector("#previewBtn").style.display = "none";
      //   document.querySelector("#submitSection").style.display = "block";
      // toggleForm();
    } else {
      // On Submission
      //submit
      //   TODO Reenable after Dev
      //   localStorage.removeItem("taxIdForm");
      // TODO Add Ticket ID to Success Header
      apiResponse["ticketId"] = apiResponse["data"].data.ticket;
      //   document.querySelector("#tickedId").innerHTML = data.data.ticket;

      // TODO Add Applink
      const downloadAppLink = `https://onboarding.accountable.de/${
        sLang === "en" ? "en/" : ""
      }raso?d=${generateWebSignupPayLoad(
        apiResponse["data"].data.ticket
      )}&utm_content=${fields.version}`;

      apiResponse["downloadAppLink_desktop"] = downloadAppLink;
      apiResponse["downloadAppLink_mobile"] =
        "https://accountable.app.link/FTshY7oGF3?";

      // A Section (NEW)
      //   document.querySelectorAll(".dlAccountableLink").forEach((link) => {
      //     if (link.classList.contains("mobile-only")) {
      //       return;
      //     }
      //     link.href = `https://onboarding.accountable.de/${
      //       sLang === "en" ? "en/" : ""
      //     }raso?d=${generateWebSignupPayLoad(data.data.ticket)}&utm_content=${
      //       fields.version
      //     }`;
      //   });

      // TODO Show RASO Header
      apiResponse["showHeader"] = true;
      //   document.querySelector("#rasoHead").style.display = "none";
      //   document.querySelector(".top-section-raso-bg").style.display = "none";
      //   document.querySelector(".raso").style.display = "none";
      //   document.querySelector("#rasoHeadCongrats").style.display = "block";
      //   document.querySelector("#rasoFormSubmitted").style.display = "block";

      apiResponse["nextVatDeadline"] = getNextVATDeadline();

      // TODO computeSuccessPage(ver);
      window.scrollTo(0, 0);

      // fbq && fbq("trackCustom", "TaxIdRegistrationLead");
    }
  }

  //   TODO On Failure
  if (!apiResponse["data"]?.success) {
    apiResponse["success"] = false;
    apiResponse["code"] = apiResponse["data"]?.code;
    apiResponse["message"] = apiResponse["data"]?.message;
    // document.querySelector("#erBox").style.display = "block";
    preview = false;
    // TODO Show The Form  toggleForm();
    // TODO Show The Error Messages
  }
  return apiResponse;
}
