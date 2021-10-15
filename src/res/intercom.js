import { country, intercomId } from "../settings/config";
export const initIntercom = () => {
  var w = window;
  var ic = w.Intercom;
  if (typeof ic === "function") {
    ic("reattach_activator");
    ic("update", w.intercomSettings);
  } else {
    var d = document;
    var i = function () {
      i.c(arguments);
    };
    i.q = [];
    i.c = function (args) {
      i.q.push(args);
    };
    w.Intercom = i;
    var l = function () {
      var s = d.createElement("script");
      s.type = "text/javascript";
      s.async = true;
      s.src = "https://widget.intercom.io/widget/" + intercomId;
      var x = d.getElementsByTagName("script")[0];
      x.parentNode.insertBefore(s, x);
    };
    if (w.attachEvent) {
      w.attachEvent("onload", l);
    } else {
      w.addEventListener("load", l, false);
    }
  }
  window.Intercom("boot", { app_id: intercomId });
  window.Intercom("hide");
};

export const setIntercomSettings = (data, language) => {
  window.intercomSettings = {
    app_id: intercomId,
    email: data.email,
    name: `${data.firstName} ${data.lastName}`,
    phone: data.phoneNumber,
    VAT_type: data.VATType,
    account_type: data.accountType,
    language: language,
    language_override: language,
    user_country: data.country,
    user_id: data._id,
    ...(data.VATNumber && { VAT_number: data.VATNumber }),
    ...(data.NACECodes && {
      NACE_main: JSON.stringify(
        Object.values(data.NACECodes).map((nc) => nc[0])
      ).slice(1, -1),
    }),
    ...(data.startDate && {
      KBO_start_date: new Date(data.startDate).getTime() / 1000,
    }),
    address: JSON.stringify(
      Object.values({
        ...(data.city && { city: data.city }),
        ...(data.zipcode && { zip: data.zip }),
        ...(data.street && { street: data.street }),
      }).slice(1, -1)
    ),
    finished_sign_up: true,
  };
  if (window.Intercom) {
    window.Intercom("update");
  } else {
    setTimeout(() => {
      if (window.Intercom) {
        window.Intercom("update");
      }
    }, 2000);
  }
};
export const setIntercomEmail = (email, language) => {
  window.intercomSettings = {
    app_id: intercomId,
    email,
    finished_sign_up: false,
    language: language,
    language_override: language,
    user_country: country,
  };
  if (window.Intercom) {
    window.Intercom("update");
  } else {
    setTimeout(() => {
      if (window.Intercom) {
        window.Intercom("update");
      }
    }, 2000);
  }
};

export const setIntercomPhone = (phone, language) => {
  window.intercomSettings = {
    app_id: intercomId,
    phone,
    language: language,
    language_override: language,
    user_country: country,
  };
  if (window.Intercom) {
    window.Intercom("update");
  } else {
    setTimeout(() => {
      if (window.Intercom) {
        window.Intercom("update");
      }
    }, 2000);
  }
};
