import React, { useState } from "react";
import PropTypes from "prop-types";
import { format, fromUnixTime } from "date-fns";
import { Collapse } from "react-collapse";

import Details from "./details";
import Icon from "./icon";
import Timeline from "./timeline";
import { weatherData as weatherDataPropType } from "../../api/weatherDataPropTypes";

/**
 * @component
 * @example
 * <CardDate
 *   date={new Date()}
 *   displayName={"A Cool Display Name"}
 * />
 */
function CardDate({ date, displayName }) {
  const displayDate = format(date, "do MMMM");
  return (
    <span>
      {displayName ? (
        <>
          {displayName}
          <br />
          <small>{displayDate}</small>
        </>
      ) : (
        displayDate
      )}
    </span>
  );
}

CardDate.propTypes = {
  // The Date shown
  date: PropTypes.instanceOf(Date).isRequired,
  // Changes the style of the component
  // when this is provided
  displayName: PropTypes.string,
};

/**
 * @component
 * @example
 * <WeatherCard
 *   isOpen={false}
 *   weatherData={weatherDataObject}
 *   date={123456}
 *   theme={"light"}
 * />
 */
export default function WeatherCard({
  isOpen: initialOpenState,
  weatherData,
  date: unixDate,
  theme,
}) {
  const {
    avgWeather,
    temps,
    displayName,
    times,
    descriptions,
    icons,
  } = weatherData;
  const [isOpen, setIsOpen] = useState(initialOpenState);
  const date = fromUnixTime(unixDate);
  return (
    <div>
      <button
        className={`weather-button${isOpen ? " open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="button-content">
          <Icon icon={avgWeather.icon} />
          <h2>
            {format(date, "do MMMM")}
            <br />
            <small>{format(date, "EEEE")}</small>
          </h2>
          <div className="details">
            <table>
              <tbody>
                <tr>
                  <td>Min</td>
                  <td>{temps.min}</td>
                </tr>
                <tr>
                  <td>Max</td>
                  <td>{temps.max}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </button>
      <Collapse isOpened={isOpen}>
        <div className="weather-card">
          <section className="header">
            <CardDate date={date} displayName={displayName} />
          </section>
          <Details weatherData={weatherData} theme={theme} />
          <Timeline times={times} descriptions={descriptions} icons={icons} />
        </div>
      </Collapse>
    </div>
  );
}

WeatherCard.propTypes = {
  // Is the detail view initially open
  isOpen: PropTypes.bool,
  // A unix time stamp for the date to show
  date: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  // Passed through to various child components for styling
  theme: PropTypes.string,
  // Data to show in the Card
  weatherData: weatherDataPropType,
};

WeatherCard.defaultProps = {
  isOpen: false,
  theme: "light",
};
