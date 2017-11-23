import React from "react";
import _ from "lodash";

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
      weatherDetails: []
    };
  }

  componentDidMount() {
    const temps = this.convertPropertyToArray("main['temp']");
    const wind = this.convertPropertyToArray("wind['speed']");
    const direction = this.convertPropertyToArray("wind['deg']");
    const rain = this.convertPropertyToArray("wind['deg']");

    this.setState({
      weatherDetails: [
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
    return (
      <div>
        <table>
          <tbody>
            {this.state.weatherDetails.map(data => (
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
