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
