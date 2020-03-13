import _ from "lodash";
import { format, fromUnixTime } from "date-fns";

const degToCompass = num => {
  const val = Math.floor(num / 22.5 + 0.5);
  // prettier-ignore
  const arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  return arr[val % arr.length];
};

// Returns the string found the most times in an array
function mostFrequent(array) {
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
function convertPropertyToArray(arrayOfObjects, property) {
  return arrayOfObjects.map(object => _.get(object, property));
}

function calcMin(range) {
  return Math.min(...range);
}

function calcMax(range) {
  return Math.max(...range);
}

function calcAvg(range) {
  return (range.reduce((a, b) => a + b) / range.length).toFixed(2);
}

function toDegrees(string) {
  const degreeSymbol = "°C";
  return string.toString().concat(degreeSymbol);
}

function toMeasurement(string) {
  const measurementSymbol = "mm";
  return string.toString().concat(measurementSymbol);
}

// Main Function
export default function convertWeatherData(weatherData) {
  const weatherDataArray = property =>
    convertPropertyToArray(weatherData, property);

  const convertedProperties = {
    temps: weatherDataArray("main['temp']"),
    wind: weatherDataArray("wind['speed']"),
    windDirection: weatherDataArray("wind['deg']"),
    rain: weatherDataArray("rain['3h']").map(val =>
      val === undefined ? 0 : Number(val.toFixed(2))
    ),
    snow: weatherDataArray("snow['3h']").map(val =>
      val === undefined ? 0 : Number(val.toFixed(2))
    ),
    humidity: weatherDataArray("main['humidity']"),
    times: weatherDataArray("dt").map(date =>
      format(fromUnixTime(date), "h:mma")
    )
  };

  // Return object containing organised data for the day
  const {
    temps,
    wind,
    windDirection,
    rain,
    snow,
    times,
    humidity
  } = convertedProperties;
  return {
    times,
    avgWeather: {
      icon: mostFrequent(weatherDataArray("weather[0]['icon']")),
      description: mostFrequent(weatherDataArray("weather[0]['description']"))
    },
    temps: {
      min: toDegrees(Math.round(calcMin(temps))),
      max: toDegrees(Math.round(calcMax(temps))),
      avg: toDegrees(Math.round(calcAvg(temps))),
      data: temps.map(val => Math.round(val))
    },
    wind: {
      avg: `${calcAvg(wind)}m/s`,
      direction: degToCompass(calcAvg(windDirection)),
      data: wind.map(val => Math.round(val))
    },
    snow: {
      avg: toMeasurement(calcAvg(snow)),
      data: snow
    },
    rain: {
      avg: toMeasurement(calcAvg(rain)),
      data: rain
    },
    humidity: {
      avg: calcAvg(humidity).concat("%"),
      data: humidity
    }
  };
}
