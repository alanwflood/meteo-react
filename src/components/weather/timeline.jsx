import React, {useRef} from "react";
import PropTypes from "prop-types";
import {upperFirst} from "lodash";
import { format, fromUnixTime } from "date-fns";
import Icon from "./icon";

function WeatherEntry({ date, popupContent, icon }) {
  // Tippy is a big library for something so simple so dynamically load it.
  const tippy = import("tippy.js")
  const tooltipRef = useRef(null)

  // Ref has been attached so setup tooltip library
  if (tooltipRef !== null) {
    tippy.then(t => {
      t.default(tooltipRef.current, {
        content: upperFirst(popupContent),
        placement: "bottom",
        animation: "fade",
        arrow: true,
      });
    })
  }

  return (
    <div className="weather-entry">
      <div className="time">{format(fromUnixTime(date), "h:mma")}</div>
      <div className="description" ref={tooltipRef}>
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
