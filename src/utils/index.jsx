import _ from "lodash";

// Returns the string found the most times in an array
export function mostFrequent(array) {
  const frequency = {};
  let max = 0;
  let result;
  for (let i = 0; i < array.length; i += 1) {
    frequency[array[i]] = (frequency[array[i]] || 0) + 1;
    if (frequency[array[i]] > max) {
      max = frequency[array[i]];
      result = array[i];
    }
  }
  return result;
}

// take an array of ojects and return an
// array of the values of the property in each object
export function convertPropertyToArray(arrayOfObjects, property) {
  return arrayOfObjects.map(object => _.get(object, property));
}

export function calcMin(range) {
  return Math.min(...range);
}

export function calcMax(range) {
  return Math.max(...range);
}

export function calcAvg(range) {
  return (range.reduce((a, b) => a + b) / range.length).toFixed(2);
}
