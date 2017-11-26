import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import Icon from "./weather-icon";
import {
  mostFrequent,
  convertPropertyToArray,
  calcMin,
  calcMax,
  calcAvg
} from "../../utils";

// Average Temperature
// Min Temperature
// Max Temperature
// Temperature Chart x: time y: temperature
// Average Humidity
// Rain Chart x: time it rains y: how much

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
    const { weatherData } = this.state;
    const weatherDataArray = property =>
      convertPropertyToArray(weatherData, property);

    const avgWeather = mostFrequent(
      weatherDataArray("weather[0]['description']")
    );
    const avgWeatherIcon = mostFrequent(weatherDataArray("weather[0]['icon']"));
    const temps = weatherDataArray("main['temp']");
    const wind = weatherDataArray("wind['speed']");
    const direction = weatherDataArray("wind['deg']");
    const rain = weatherDataArray("wind['deg']");

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

  render() {
    const { weatherDetails, weatherTable } = this.state;
    return (
      <div className="weather-details">
        {weatherDetails.length && (
          <div>
            <Icon icon={weatherDetails[1]} />
            <h3>{_.upperFirst(weatherDetails[0])}</h3>
          </div>
        )}
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

WeatherDetails.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired
};
