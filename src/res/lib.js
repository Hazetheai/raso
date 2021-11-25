export function removeDuplicates(array) {
  return array.filter((item, index) => array.indexOf(item) === index);
}

export function isEmpty(object) {
  return Object.keys(object).length === 0;
}

export function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

export function cleanLocal() {
  localStorage.removeItem("personalFields");
  localStorage.removeItem("businessFields");
  localStorage.removeItem("taxInfoFields");
  localStorage.removeItem("taxEstimateFields");
  localStorage.removeItem("bankAccountFields");
  localStorage.removeItem("reviewFields");
  localStorage.removeItem("userData");
  localStorage.removeItem("userInteraction");
}

/**
 *
 * @param {number} n Number to Wrap
 * @param {number} min Minimum Value
 * @param {number} max Maximum Value
 * @returns {number}
 */
export function wrap(n, min, max) {
  if (typeof n !== "number") n = sanitizeNumbers(n);

  if (n < min) return max;
  if (n > max) return min;

  return n;
}

/**
 *
 * @param {string|number} string
 * @param {boolean} [nodecimal]
 * @returns
 */
export function sanitizeNumbers(string, nodecimal) {
  if (typeof string === "number") return string;

  if (nodecimal) {
    return parseInt(`${string}`.replace(/\D|,|\./g, ""), 10);
  } else {
    return parseInt(`${string}`.replace(/\D/g, ""), 10);
  }
}

export function flatten2DObject(obj) {
  const newObj = {};
  Object.entries(obj).forEach((el) =>
    Object.entries(el[1]).forEach((item) => (newObj[item[0]] = item[1]))
  );
  return newObj;
}
