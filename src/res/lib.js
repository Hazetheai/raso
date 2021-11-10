export function removeDuplicates(array) {
  return array.filter((item, index) => array.indexOf(item) === index);
}

export function isEmpty(object) {
  return Object.keys(object).length === 0;
}
