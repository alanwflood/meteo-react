import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import _ from "lodash";
import tippy from "tippy.js";
import Icon from "./weather-icon";

class WeatherTimeline extends React.Component {
  componentDidMount() {
    tippy(".description", {
      placement: "bottom",
      animation: "fade",
      arrow: true,
      offset: "0, 5"
    });
  }

  render() {
    return (
      <section>
        <h3 style={{ textAlign: "center" }}>Timeline</h3>
        <div className="timeline">
          {this.props.weatherData.map(data => (
            <div key={data.dt} className="weather-entry">
              <div className="time">{moment.unix(data.dt).format("h:mma")}</div>
              <div
                className="description"
                title={_.upperFirst(data.weather[0].description)}
              >
                <Icon icon={data.weather[0].icon} />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
}
export default WeatherTimeline;

WeatherTimeline.propTypes = {
  weatherData: PropTypes.arrayOf(PropTypes.object).isRequired
};
