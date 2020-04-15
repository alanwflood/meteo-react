import { get as getObjectProperty, groupBy } from "lodash";
import { startOfDay, getUnixTime, fromUnixTime, add } from "date-fns";

/**
 * Converts degrees into compass directions
 * @param {number} deg
 * @returns {string}
 */
export function degToCompass(deg) {
  // prettier-ignore
  const compassDirections = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  const val = Math.floor(deg / 22.5 + 0.5);
  return compassDirections[val % compassDirections.length];
}

/**
 * Find the most frequently occuring value in an array
 * @param {any[]} array
 * @returns {any[]}
 */
export function mostFrequent(array) {
  const frequency = {};
  let max = 0;
  let result;
  for (let i = 0; i < array.length; i++) {
    frequency[array[i]] = (frequency[array[i]] || 0) + 1;
    if (frequency[array[i]] > max) {
      max = frequency[array[i]];
      result = array[i];
    }
  }
  return result;
}

/**
 * @param {number[]} range
 * @returns {number}
 */
export function calcMin(range) {
  return Math.min(...range);
}

/**
 * @param {number[]} range
 * @returns {number}
 */
export function calcMax(range) {
  return Math.max(...range);
}

/**
 * @param {number[]} range
 * @returns {number}
 */
export function calcAvg(range) {
  return (range.reduce((a, b) => a + b) / range.length).toFixed(2);
}

/**
 * @todo Eventually support farenheit
 *
 * @param {(number|string)} temp
 * @returns {string}
 */
export function toDegrees(temp) {
  const degreeSymbol = "°C";
  return temp.toString().concat(degreeSymbol);
}

/**
 * @todo Eventually support imperial measurement
 *
 * @param {string|number} measurement
 * @returns {string}
 */
export function toMeasurement(measurement) {
  const measurementSymbol = "mm";
  return measurement.toString().concat(measurementSymbol);
}

/**
 * Takes an array of objects containing a property and return an
 * array consisting of values of said property pulled from each object
 *
 * @param {Object[]} arrayOfObjects
 * @param {string} property
 * @returns {any[]}
 */
export function convertPropertyToArray(arrayOfObjects, property) {
  return arrayOfObjects.map((object) => getObjectProperty(object, property));
}

/**
 * Groups weather entries by date
 *
 * @param {Object}   weatherData
 * @param {Object[]} weatherData.list
 * @param {number}   weatherData.dt
 * @returns {Object}
 */
export function groupWeatherByDate(weatherData) {
  return groupBy(weatherData.list, (listItem) =>
    getUnixTime(startOfDay(fromUnixTime(listItem.dt)))
  );
}

/**
 * @param {number} daysOffset
 * @returns {number}
 * */
export function getStartOfToday(daysOffset = 0) {
  const now = startOfDay(new Date());
  return getUnixTime(add(now, { days: daysOffset })).toString();
}

/**
 * Return a nice wee name when a timestamp matches today or tomorrow
 *
 * @param {(number|string)} date - A unix timestamp
 * @returns {(string|null)}
 */
export function getDisplayName(date) {
  const today = getStartOfToday();
  const tomorrow = getStartOfToday(1);

  if (date === today) {
    return "today";
  } else if (date === tomorrow) {
    return "tomorrow";
  } else {
    return null;
  }
}
