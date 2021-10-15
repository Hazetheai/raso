import ReactPixel from "react-facebook-pixel";
import { fbPixelId } from "../settings/config";

const options = {
  autoConfig: true, // set pixel's autoConfig
  debug: false, // enable logs
};

export const initPixel = () => ReactPixel.init(fbPixelId, {}, options);

export const logPageView = () => ReactPixel.pageView();

export const logEvent = (event, data = {}) =>
  ReactPixel.trackCustom(event, data);
