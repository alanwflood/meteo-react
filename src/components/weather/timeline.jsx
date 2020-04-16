import React, { useRef } from "react";
import PropTypes from "prop-types";
import { upperFirst } from "lodash";
import { format, fromUnixTime } from "date-fns";
import Icon from "./icon";

/**
 * @component
 * @example
 * <WeatherEntry
 *   date={1586960512}
 *   popupContent="Show me in a popup"
 *   icon="icon-name"
 * />
 */
function WeatherEntry({ date, popupContent, icon }) {
  // Tippy is a big library for something so simple so dynamically load it.
  const tippy = import("tippy.js");
  const tooltipRef = useRef(null);

  // Ref has been attached so setup tooltip library
  tippy.then((t) => {
    t.default(tooltipRef.current, {
      content: upperFirst(popupContent),
      placement: "bottom",
      animation: "fade",
      arrow: true,
    });
  });

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
  // Unix Timestamp
  date: PropTypes.number,
  // Content to show up in popup
  popupContent: PropTypes.string,
  icon: PropTypes.string,
};

export default function WeatherTimeline({ weatherData }) {
  return (
    <section>
      <h3 style={{ textAlign: "center" }}>Timeline</h3>
      <div className="timeline">
        {weatherData.times.map((time, index) => {
          const icon = weatherData.icons[index];
          const content = weatherData.descriptions[index];
          return (
            <WeatherEntry
              key={time}
              date={time}
              popupContent={content}
              icon={icon}
            />
          );
        })}
      </div>
    </section>
  );
}

WeatherTimeline.propTypes = {
  weatherData: PropTypes.object.isRequired,
};
