import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Icon from "./icon";
import Chart from "./chart";
import colors from "../../assets/stylesheets/colors.json";

export default function WeatherDetails({ weatherData, theme }) {
  const weatherTable = [
    ["Min Temperature", weatherData.temps.min],
    ["Max Temperature", weatherData.temps.max],
    ["Avg Temperature", weatherData.temps.avg],
    ["Avg Humidity", weatherData.humidity.avg],
    ["Avg Windspeed", weatherData.wind.avg],
    ["Direction", weatherData.wind.direction]
  ];

  return (
    <section className="content">
      <div className="weather-details">
        <div>
          <Icon icon={weatherData.avgWeather.icon} />
          <h3>{_.upperFirst(weatherData.avgWeather.description)}</h3>
        </div>
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
        <Tabs>
          <TabList className="weather-tabs">
            {["Rainfall", "Temperature", "Windspeed", "Humidity"].map(data => (
              <Tab className={`weather-tab ${data.toLowerCase()}`} selectedClassName="active" key={data}>
                {data}
              </Tab>
            ))}
          </TabList>
          <TabPanel>
            <Chart
              barColor={colors.blue}
              theme={theme}
              unit="mm"
              xAxes={weatherData.rain.data}
              yAxes={weatherData.times}
            />
          </TabPanel>
          <TabPanel>
            <Chart
              barColor={colors.red}
              theme={theme}
              unit="°C"
              xAxes={weatherData.temps.data}
              yAxes={weatherData.times}
            />
          </TabPanel>
          <TabPanel>
            <Chart
              barColor={colors.yellow}
              theme={theme}
              unit="m/s"
              xAxes={weatherData.wind.data}
              yAxes={weatherData.times}
            />
          </TabPanel>
          <TabPanel>
            <Chart
              barColor={colors.purple}
              theme={theme}
              unit="%"
              xAxes={weatherData.humidity.data}
              yAxes={weatherData.times}
            />
          </TabPanel>
        </Tabs>
      </div>
    </section>
  );
}

WeatherDetails.propTypes = {
  weatherData: PropTypes.object.isRequired,
  theme: PropTypes.string
};
WeatherDetails.defaultProps = {
  theme: "light"
};
