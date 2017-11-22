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
  Math.floor(range.reduce((a, b) => a + b) / range.length);

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
  convertPropertyToArray = property =>
    this.props.data.map(data => _.get(data, property));

  render() {
    const temps = this.convertPropertyToArray("main['temp']");
    const wind = this.convertPropertyToArray("main['temp']");
    return (
      <div>
        <div>Min Temp: {calcMin(temps)}&deg;c</div>
        <div>Max Temp: {calcMax(temps)}&deg;c</div>
        <div>Avg Temp: {calcAvg(temps)}&deg;c</div>
      </div>
    );
  }
}
