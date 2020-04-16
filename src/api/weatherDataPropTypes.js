import { string, number, arrayOf, shape } from "prop-types";

export const weatherDetail = shape({
  avg: string.isRequired,
  data: arrayOf(number.isRequired).isRequired,
});

// PropType of converted weather data
export const weatherData = shape({
  avgWeather: shape({
    description: string.isRequired,
    icon: string.isRequired,
  }).isRequired,
  descriptions: arrayOf(string.isRequired).isRequired,
  displayName: string,
  humidity: weatherDetail.isRequired,
  icons: arrayOf(string.isRequired).isRequired,
  rain: weatherDetail.isRequired,
  snow: weatherDetail.isRequired,
  temps: shape({
    avg: string.isRequired,
    data: arrayOf(number.isRequired).isRequired,
    max: string.isRequired,
    min: string.isRequired,
  }).isRequired,
  times: arrayOf(number.isRequired).isRequired,
  wind: shape({
    avg: string.isRequired,
    data: arrayOf(number.isRequired).isRequired,
    direction: string.isRequired,
  }).isRequired,
}).isRequired;

export const weatherTimes = shape({
  sunrise: number.isRequired,
  sunset: number.isRequired,
}).isRequired;
