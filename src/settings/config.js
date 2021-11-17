export const isDev = /localhost/gi.test(window.location.href);
export const corsProxy = "https://cors-anywhere.herokuapp.com/";
export const appHost = isDev
  ? "http://localhost:3000"
  : "https://accountable.de";
export const wpHost = isDev
  ? "http://localhost:10023"
  : "https://accountable.de";
export const accountableApp = "https://app.accountable.eu";
export const intercomId = "c9wnmh12"; //c9wnmh12 for prod
export const amplitudeKey = "068667cf512ab58a86f8123c64bfdee6"; // 068667cf512ab58a86f8123c64bfdee6 for prod
export const fbPixelId = "2207534789479329"; //its prod
export const gtagId = "GTM-5SW8SVC";
export const country = "de";
export const dlAppLink = "https://accountable.app.link/FTshY7oGF3?";
