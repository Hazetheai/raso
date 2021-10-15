import { amplitudeKey } from "../settings/config";
import amplitude from "amplitude-js";

export const initAmplitude = () => {
  //SSR bullet proof
  // amplitude = require('amplitude-js/amplitude');
  amplitude.getInstance().init(amplitudeKey);
};

export const setAmplitudeUserDevice = (installationToken) => {
  amplitude.getInstance().setDeviceId(installationToken);
};

export const setAmplitudeUserId = (userId, timeout = 500) => {
  if (amplitude.getInstance().getSessionId()) {
    amplitude.getInstance().setUserId(userId);
  } else {
    setTimeout(() => {
      setAmplitudeUserId(userId, timeout * 2);
    }, timeout);
  }
};

export const setAmplitudeUserProperties = (properties, timeout = 500) => {
  if (amplitude.getInstance().getSessionId()) {
    amplitude.getInstance().setUserProperties(properties);
  } else {
    setTimeout(() => {
      setAmplitudeUserProperties(properties, timeout * 2);
    }, timeout);
  }
};

export const sendAmplitudeData = (
  eventType,
  eventProperties = {},
  timeout = 500
) => {
  if (amplitude.getInstance().getSessionId()) {
    amplitude.getInstance().logEvent(eventType, eventProperties);
  } else {
    setTimeout(() => {
      sendAmplitudeData(eventType, eventProperties, timeout * 2);
    }, timeout);
  }
};
