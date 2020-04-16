import React from "react";
import { upperFirst } from "lodash";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Icon from "./icon";
import Chart from "./chart";
import colors from "../../assets/stylesheets/colors.json";
import { weatherData as weatherDataPropType } from "../../api/weatherDataPropTypes";

/**
 * Class representing data required for a Weather Chart Component
 */
class WeatherChartData {
  constructor(displayName, color, unit, dataset) {
    /**
     * @param {string} displayName
     * @param {string} color
     * @param {string} unit
     * @param {number[]} dataset
     */
    this.displayName = displayName;
    this.color = color;
    this.unit = unit;
    this.dataset = dataset;
  }
}

/**
 * Renders the data provided from the weatherApi call for a given date
 *
 * @component
 */
export default function WeatherDetails({ weatherData }) {
  const { rain, temps, wind, humidity } = weatherData;
  // More concise to render data out this way,
  // Simply add more array pairs to render out more data in
  // the main weather table
  const weatherTable = [
    ["Min Temperature", temps.min],
    ["Max Temperature", temps.max],
    ["Avg Temperature", temps.avg],
    ["Avg Humidity", humidity.avg],
    ["Avg Windspeed", wind.avg],
    ["Direction", wind.direction],
  ];

  // To add additional charts, insert a WeatherChartData object
  // with the required parameters
  const weatherCharts = [
    new WeatherChartData("Rainfall", colors.blue, "mm", rain.data),
    new WeatherChartData("Temperature", colors.red, "°C", temps.data),
    new WeatherChartData("Windspeed", colors.yellow, "m/s", wind.data),
    new WeatherChartData("Humidity", colors.purple, "mm", humidity.data),
  ];

  return (
    <section className="content">
      <div className="weather-details">
        <div>
          <Icon icon={weatherData.avgWeather.icon} />
          <h3>{upperFirst(weatherData.avgWeather.description)}</h3>
        </div>
        <table>
          <tbody>
            {weatherTable.map(([key, value]) => (
              <tr key={key}>
                <td>{key}:</td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Tabs>
          <TabList className="weather-tabs">
            {weatherCharts.map(({ displayName }) => (
              <Tab
                className={`weather-tab ${displayName.toLowerCase()}`}
                selectedClassName="active"
                key={displayName}
              >
                {displayName}
              </Tab>
            ))}
          </TabList>
          {weatherCharts.map(({ displayName, color, unit, dataset }) => (
            <TabPanel key={displayName}>
              <Chart
                barColor={color}
                unit={unit}
                xAxis={dataset}
                yAxis={weatherData.times}
              />
            </TabPanel>
          ))}
        </Tabs>
      </div>
    </section>
  );
}

WeatherDetails.propTypes = {
  weatherData: weatherDataPropType,
};
