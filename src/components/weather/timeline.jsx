import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { format, fromUnixTime } from "date-fns";
import tippy from "tippy.js";
import Icon from "./icon";

function WeatherEntry({ date, popupContent, icon }) {
  return (
    <div className="weather-entry">
      <div className="time">{format(fromUnixTime(date), "h:mma")}</div>
      <div className="description" title={_.upperFirst(popupContent)}>
        <Icon icon={icon} />
      </div>
    </div>
  );
}

WeatherEntry.propTypes = {
  date: PropTypes.number,
  popupContent: PropTypes.string,
  icon: PropTypes.string
};

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
            <WeatherEntry
              key={data.dt}
              date={data.dt}
              popupContent={data.weather[0].description}
              icon={data.weather[0].icon}
            />
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
