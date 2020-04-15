import {
  calcAvg,
  calcMax,
  calcMin,
  convertPropertyToArray,
  degToCompass,
  getDisplayName,
  getStartOfToday,
  groupWeatherByDate,
  mostFrequent,
  toDegrees,
  toMeasurement,
} from "./weatherConversionUtils";

/**
 * Today's weather is not always 6 entries long,
 * so use tomorrows weather to fill in the gaps
 *
 * @param {Object} weatherData
 * @returns {Object}
 */
function spliceTodaysWeatherData(weatherData) {
  const today = getStartOfToday();
  const tomorrow = getStartOfToday(1);

  const weatherToday = weatherData[today];
  // If today's weather doesn't exist it's probably midnight
  // or it it's length is greather than 6 so continue
  if (weatherToday && weatherToday.length < 6) {
    //  Add additional entries from tomorrows weather
    const additionalForecast = weatherData[tomorrow].slice(
      0,
      8 - weatherToday.length
    );
    weatherData[today] = weatherToday.concat(additionalForecast);
  }
  return weatherData;
}

/**
 * Reshape the weather json object into a more consumable structure
 *
 * @param {(number|string)} date - A unix timestamp
 * @param {Object} weatherData
 * @returns {Object}
 */
function shapeDailyWeatherData(date, weatherData) {
  // We want the reponses to come back as an array of values
  // instead of an array of objects containing said data.
  const weatherDataArray = (property) =>
    convertPropertyToArray(weatherData, property);

  // TODO: Refactor away from performing multiple loops to fill out data
  return {
    date,
    avgWeather: {
      icon: mostFrequent(weatherDataArray("weather[0]['icon']")),
      description: mostFrequent(weatherDataArray("weather[0]['description']")),
    },
    temps: weatherDataArray("main['temp']"),
    wind: weatherDataArray("wind['speed']"),
    windDirection: weatherDataArray("wind['deg']"),
    rain: weatherDataArray("rain['3h']").map((val) =>
      val === undefined ? 0 : Number(val.toFixed(2))
    ),
    snow: weatherDataArray("snow['3h']").map((val) =>
      val === undefined ? 0 : Number(val.toFixed(2))
    ),
    humidity: weatherDataArray("main['humidity']"),
    descriptions: weatherDataArray("weather[0]['description']"),
    icons: weatherDataArray("weather[0]['icon']"),
    times: weatherDataArray("dt"),
  };
}

/**
 * Convert the daily weather data into something more presentable for the user
 *
 * @param {Object} dailyWeatherData
 * @returns {Object}
 */
function convertDailyWeatherData(dailyWeatherData) {
  const {
    date,
    avgWeather,
    temps,
    wind,
    windDirection,
    rain,
    snow,
    times,
    humidity,
    descriptions,
    icons,
  } = dailyWeatherData;

  return {
    times,
    avgWeather,
    descriptions,
    icons,
    displayName: getDisplayName(date),
    temps: {
      min: toDegrees(Math.round(calcMin(temps))),
      max: toDegrees(Math.round(calcMax(temps))),
      avg: toDegrees(Math.round(calcAvg(temps))),
      data: temps.map((val) => Math.round(val)),
    },
    wind: {
      avg: `${calcAvg(wind)}m/s`,
      direction: degToCompass(calcAvg(windDirection)),
      data: wind.map((val) => Math.round(val)),
    },
    snow: {
      avg: toMeasurement(calcAvg(snow)),
      data: snow,
    },
    rain: {
      avg: toMeasurement(calcAvg(rain)),
      data: rain,
    },
    humidity: {
      avg: calcAvg(humidity).concat("%"),
      data: humidity,
    },
  };
}

/**
 * Convert the json from the weather api call and convert it
 * into a consumable javascript object, keyed by date
 *
 * @param {Object} weatherJson
 * @returns {Object}
 */
export default function mapWeather(weatherJson) {
  // Group the data by date
  const dailyWeatherData = spliceTodaysWeatherData(
    groupWeatherByDate(weatherJson)
  );

  const data = Object.entries(dailyWeatherData).reduce(
    (newDataset, [date, weatherData]) => {
      // First shape the data into a new structure
      const shapedData = shapeDailyWeatherData(date, weatherData);
      // Then convert it into a presentable object
      const convertedData = convertDailyWeatherData(shapedData);
      return {
        ...newDataset,
        [date]: convertedData,
      };
    },
    {}
  );

  const times = {
    sunrise: weatherJson.city.sunrise,
    sunset: weatherJson.city.sunset,
  };

  return { data, times };
}
