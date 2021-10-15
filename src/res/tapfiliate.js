// import { tapFiliateId } from '../config';

export const initTapfiliate = (): void => {
  if (!window.tap) {
    (function (t, a, p) {
      const f = document.getElementsByTagName(p)[0],
        j = document.createElement(p);
      j.async = true;
      j.src = "https://script.tapfiliate.com/tapfiliate.js";
      f.parentNode.insertBefore(j, f);
      t.TapfiliateObject = a;
      t[a] =
        t[a] ||
        function () {
          (t[a].q = t[a].q || []).push(arguments);
        };
    })(window, "tap", "script");

    window.tap("create", "tapFiliateId", { integration: "javascript" });
    window.tap("detect");
  }
};

export const tap = (event, id) => window.tap(event, id);
