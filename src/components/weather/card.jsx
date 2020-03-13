import React from "react";
import PropTypes from "prop-types";
import { format, fromUnixTime, isToday, isTomorrow } from "date-fns";
import { Collapse } from "react-collapse";

import convertWeatherData from "./convert-weather-data";
import Details from "./details";
import Icon from "./icon";
import Timeline from "./timeline";

class WeatherCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpened: this.props.isOpen,
      // Seperation of concerns
      detailsData: convertWeatherData(this.props.weatherData),
      timelineData: this.props.weatherData
    };
  }

  cardDate = () => {
    const date = format(fromUnixTime(this.props.date), "do MMMM");
    if (isToday(fromUnixTime(this.props.date))) {
      return (
        <span>
          Today
          <br />
          <small>{date}</small>
        </span>
      );
    } else if (isTomorrow(fromUnixTime(this.props.date))) {
      return (
        <span>
          Tomorrow
          <br />
          <small>{date}</small>
        </span>
      );
    }
    return <span>{date}</span>;
  };

  render() {
    const { detailsData, timelineData } = this.state;
    const date = fromUnixTime(this.props.date);
    return (
      <div>
        <button
          className={`weather-button${this.state.isOpened ? " open" : ""}`}
          onClick={() => this.setState({ isOpened: !this.state.isOpened })}
        >
          <div className="button-content">
            <Icon icon={detailsData.avgWeather.icon} />
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
                    <td>{detailsData.temps.min}</td>
                  </tr>
                  <tr>
                    <td>Max</td>
                    <td>{detailsData.temps.max}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </button>
        <Collapse isOpened={this.state.isOpened}>
          <div className="weather-card">
            <section className="header">{this.cardDate()}</section>
            <Details weatherData={detailsData} theme={this.props.theme} />
            <Timeline weatherData={timelineData} />
          </div>
        </Collapse>
      </div>
    );
  }
}

export default WeatherCard;

WeatherCard.propTypes = {
  isOpen: PropTypes.bool,
  date: PropTypes.number.isRequired,
  weatherData: PropTypes.arrayOf(PropTypes.object).isRequired
};

// Specifies the default values for props:
WeatherCard.defaultProps = {
  isOpen: false
};
