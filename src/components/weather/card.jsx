import React, { useState } from "react";
import PropTypes from "prop-types";
import { format, fromUnixTime } from "date-fns";
import { Collapse } from "react-collapse";

import Details from "./details";
import Icon from "./icon";
import Timeline from "./timeline";
import { weatherData as weatherDataPropType } from "../../api/weatherDataPropTypes";

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
  date: PropTypes.instanceOf(Date).isRequired,
  displayName: PropTypes.string,
};

export default function WeatherCard({
  isOpen: initialOpenState,
  weatherData,
  date: unixDate,
  theme,
}) {
  const [isOpen, setIsOpen] = useState(initialOpenState);
  const date = fromUnixTime(unixDate);
  return (
    <div>
      <button
        className={`weather-button${isOpen ? " open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="button-content">
          <Icon icon={weatherData.avgWeather.icon} />
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
                  <td>{weatherData.temps.min}</td>
                </tr>
                <tr>
                  <td>Max</td>
                  <td>{weatherData.temps.max}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </button>
      <Collapse isOpened={isOpen}>
        <div className="weather-card">
          <section className="header">
            <CardDate date={date} displayName={weatherData.displayName} />
          </section>
          <Details weatherData={weatherData} theme={theme} />
          <Timeline weatherData={weatherData} />
        </div>
      </Collapse>
    </div>
  );
}

WeatherCard.propTypes = {
  isOpen: PropTypes.bool,
  date: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  theme: PropTypes.string,
  weatherData: weatherDataPropType,
};

WeatherCard.defaultProps = {
  isOpen: false,
  theme: "light",
};
