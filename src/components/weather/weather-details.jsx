import React from "react";
import _ from "lodash";
import Icon from "./weather-icon";

// Average Temperature
// Min Temperature
// Max Temperature
// Temperature Chart x: time y: temperature
// Average Humidity
// Rain Chart x: time it rains y: how much

const calcMin = range => Math.min(...range);
const calcMax = range => Math.max(...range);
const calcAvg = range =>
  (range.reduce((a, b) => a + b) / range.length).toFixed(2);

const mostFrequent = array => {
  const frequency = {}; // array of frequency.
  let max = 0; // holds the max frequency.
  let result; // holds the max frequency element.
  for (let v = 0; v < array.length; v += 1) {
    frequency[array[v]] = (frequency[array[v]] || 0) + 1; // increment frequency.
    if (frequency[array[v]] > max) {
      // is this frequency > max so far ?
      max = frequency[array[v]]; // update max.
      result = array[v]; // update result.
    }
  }
  return result;
};

const degToCompass = num => {
  const val = Math.floor(num / 22.5 + 0.5);
  const arr = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW"
  ];
  return arr[val % 16];
};

export default class WeatherDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherData: this.props.data,
      weatherDetails: [],
      weatherTable: []
    };
  }

  componentDidMount() {
    const avgWeather = mostFrequent(
      this.convertPropertyToArray("weather[0]['description']")
    );
    const avgWeatherIcon = mostFrequent(
      this.convertPropertyToArray("weather[0]['icon']")
    );
    const temps = this.convertPropertyToArray("main['temp']");
    const wind = this.convertPropertyToArray("wind['speed']");
    const direction = this.convertPropertyToArray("wind['deg']");
    const rain = this.convertPropertyToArray("wind['deg']");

    this.setState({
      weatherDetails: [avgWeather, avgWeatherIcon],
      weatherTable: [
        ["Min Temperature", `${Math.round(calcMin(temps))}°C`],
        ["Max Temperature", `${Math.round(calcMax(temps))}°C`],
        ["Avg Temperature", `${Math.round(calcAvg(temps))}°C`],
        ["Avg Windspeed", `${calcAvg(wind)}m/s`],
        ["Direction", degToCompass(calcAvg(direction))]
      ]
    });
  }

  rainData = () => {
    if (this.state.weatherData.rain !== undefined) {
    } else {
      const { weatherData } = this.state;
      const weatherWithRain = weatherData;
      this.setState(weatherData);
    }
  };

  convertPropertyToArray = property =>
    this.state.weatherData.map(data => _.get(data, property));

  render() {
    const { weatherDetails, weatherTable } = this.state;
    return (
      <div className="weather-details">
        {weatherDetails.length && <Icon icon={weatherDetails[1]} />}
        <table>
          <tbody>
            {weatherTable.map(data => (
              <tr key={data[0]}>
                <td>{data[0]}:</td>
                <td>{data[1]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
