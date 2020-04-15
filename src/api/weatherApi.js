import convertWeatherData from "./weatherConversion";

const baseUrl = "https://api.openweathermap.org/data/2.5/";
const apiKey = process.env.WEATHER_API_KEY;

/**
 * Methods to fetch data from openweathermap.org
 *
 * @param {(number|string)} lat
 * @param {(number|string)} lng
 * @returns {Object}
 */
export default function WeatherAPI(lat, lng) {
  return {
    fetchFiveDayWeather: fetchFiveDayWeather(lat, lng),
  };
}

/**
 * @throws Will throw an error if any step in promise fails
 * @param {(number|string)} lat
 * @param {(number|string)} lng
 * @returns {Object}
 */
function fetchFiveDayWeather(lat, lng) {
  const url = `${baseUrl}forecast?lat=${lat}&lon=${lng}&units=metric&appid=${apiKey}`;
  return (callback) =>
    fetch(url)
      .then((res) => res.json())
      .then((json) => convertWeatherData(json))
      .then((weatherData) => callback(weatherData))
      .catch((error) =>
        console.error(
          `Failed to fetch 5 day weather for: ${url}\n Got error: `,
          error
        )
      );
}

// TODO: In the future get more detail for current weather at location
// function fetchCurrentWeather(lat, lng) {
//   const currentWeatherUrl = `${baseUrl}weather?lat=${lat}&lon=${lng}&units=metric&appid=${apiKey}`;
//   return (callback) =>
//     fetch(url)
//       .then((res) => res.json())
//       .then((json) => callback(json))
//       .catch((error) =>
//         console.error(
//           `Failed to fetch current weather for: ${url}`,
//           "Got error: ",
//           error
//         )
//       );
// }
