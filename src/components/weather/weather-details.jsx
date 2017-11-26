import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Icon from "./weather-icon";
import Chart from "./weather-chart";
import colors from "../../assets/stylesheets/colors.json";

// Average Temperature
// Min Temperature
// Max Temperature
// Temperature Chart x: time y: temperature
// Average Humidity
// Rain Chart x: time it rains y: how much

export default class WeatherDetails extends React.Component {
  constructor(props) {
    super(props);
    const { weatherData } = this.props;
    this.state = {
      weatherTable: [
        ["Min Temperature", weatherData.temps.min],
        ["Max Temperature", weatherData.temps.max],
        ["Avg Temperature", weatherData.temps.avg],
        ["Avg Humidity", weatherData.humidity.avg],
        ["Avg Windspeed", weatherData.wind.avg],
        ["Direction", weatherData.wind.direction]
      ]
    };
  }

  render() {
    const { weatherData } = this.props;
    const { weatherTable } = this.state;
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
              {[
                "Rainfall",
                "Temperature",
                "Windspeed",
                "Humidity"
              ].map(data => (
                <Tab selectedClassName="active" key={data}>
                  {data}
                </Tab>
              ))}
            </TabList>
            <TabPanel>
              <Chart
                barColor={colors.blue}
                theme={this.props.theme}
                unit="mm"
                xAxes={weatherData.rain.data}
                yAxes={weatherData.times}
              />
            </TabPanel>
            <TabPanel>
              <Chart
                barColor={colors.red}
                theme={this.props.theme}
                unit="°C"
                xAxes={weatherData.temps.data}
                yAxes={weatherData.times}
              />
            </TabPanel>
            <TabPanel>
              <Chart
                barColor={colors.yellow}
                theme={this.props.theme}
                unit="m/s"
                xAxes={weatherData.wind.data}
                yAxes={weatherData.times}
              />
            </TabPanel>
            <TabPanel>
              <Chart
                barColor={colors.purple}
                theme={this.props.theme}
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
}

WeatherDetails.propTypes = {
  weatherData: PropTypes.object.isRequired,
  theme: PropTypes.string
};
WeatherDetails.defaultProps = {
  theme: "light"
};
