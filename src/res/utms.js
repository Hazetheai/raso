import qs from 'querystring';

// Ponyfill for Object.fromEntries as it's not available in Samsung Internet/IE11 and makes the app crash.
const fromEntries = (iterable) =>
  [...iterable].reduce(
    (acc, [key, val]) => ({
      ...acc,
      [key]: val,
    }),
    {}
  );


export const getUtms = () => {
  const usable =
    window.location.search[0] === '?' ? window.location.search.slice(1) : window.location.search;
  const params = qs.parse(usable);
  const markers = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_content',
    'utm_term',
  ]; // all existing utm markers

  return fromEntries(
    // filter params to get only utm markers
    Object.entries(params).filter(([key]) => markers.includes(key))
  );
};
