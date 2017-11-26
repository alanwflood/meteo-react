import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import moment from "moment";
import tippy from "tippy.js";
import { Collapse } from "react-collapse";
import { convertPropertyToArray, mostFrequent } from "../../utils";
import WeatherDetails from "./weather-details";
import Icon from "./weather-icon";

class WeatherCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpened: this.props.isOpen
    };
  }

  componentDidMount() {
    tippy(".description", {
      placement: "bottom",
      animation: "fade",
      arrow: true,
      offset: "0, 5"
    });
  }

  cardDate = () => {
    const format = dateToFormat => dateToFormat.format("Do MMMM");
    const date = format(moment.unix(this.props.date));
    const today = moment();

    if (date === format(today)) {
      return (
        <span>
          Today<br />
          <small>{date}</small>
        </span>
      );
    } else if (date === format(moment(today).add(1, "days"))) {
      return (
        <span>
          Tomorrow<br />
          <small>{date}</small>
        </span>
      );
    }
    return <span>{date}</span>;
  };

  avgWeatherIcon = () =>
    mostFrequent(
      convertPropertyToArray(this.props.weatherData, "weather[0][icon]")
    );

  render() {
    const { weatherData } = this.props;
    const date = moment.unix(this.props.date);
    return (
      <div>
        <button
          className="weather-button"
          onClick={() => this.setState({ isOpened: !this.state.isOpened })}
        >
          <Icon icon={this.avgWeatherIcon()} />
          <h2>
            {date.format("Do MMM")}
            <br />
            <small>{date.format("dddd")}</small>
          </h2>
        </button>
        <Collapse isOpened={this.state.isOpened}>
          <div className="weather-card">
            <section className="header">{this.cardDate()}</section>
            <section className="content">
              <WeatherDetails data={weatherData} />
            </section>
            <section className="timeline">
              {weatherData.map(data => (
                <div key={data.dt} className="weather-entry">
                  <div className="time">
                    {moment.unix(data.dt).format("h:mma")}
                  </div>
                  <div
                    className="description"
                    title={_.upperFirst(data.weather[0].description)}
                  >
                    <Icon icon={data.weather[0].icon} />
                  </div>
                </div>
              ))}
            </section>
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
