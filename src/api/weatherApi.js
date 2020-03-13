import _ from "lodash";
import { fromUnixTime, startOfDay, getUnixTime } from "date-fns";

export default function WeatherAPI(lat, lng) {
  const baseUrl = "https://api.openweathermap.org/data/2.5/";
  const apiKey = "fedc4be60e5e3367b61c1c3846c8c557";

  const fiveDayForecastUrl = `${baseUrl}forecast?lat=${lat}&lon=${lng}&units=metric&appid=${apiKey}`;
  const currentWeatherUrl = `${baseUrl}weather?lat=${lat}&lon=${lng}&units=metric&appid=${apiKey}`;

  return {
    fetchFiveDayWeather: fetchFiveDayWeather(fiveDayForecastUrl),
    fetchCurrentWeather: fetchCurrentWeather(currentWeatherUrl)
  };
}

function fetchCurrentWeather(url) {
  return callback =>
    fetch(url)
      .then(res => res.json())
      .then(json => callback(json))
      .catch(error =>
        console.error(
          `Failed to fetch current weather for: ${url}`,
          "Got error: ",
          error
        )
      );
}

// Format api response to
// weather for seperate days
function groupWeatherByDate(weatherData) {
  return _.groupBy(weatherData.list, listItem =>
    getUnixTime(startOfDay(fromUnixTime(listItem.dt)))
  );
}

function fetchFiveDayWeather(url) {
  return callback =>
    fetch(url)
      .then(res => res.json())
      .then(json => groupWeatherByDate(json))
      .then(groupedWeatherData => callback(groupedWeatherData))
      .catch(error =>
        console.error(
          `Failed to fetch 5 day weather for: ${url}\n Got error: `,
          error
        )
      );
}
