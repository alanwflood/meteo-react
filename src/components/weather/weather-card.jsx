import React from "react";
import moment from "moment";
import tippy from "tippy.js";
import WeatherDetails from "./weather-details";
import Icon from "./weather-icon";

class WeatherCard extends React.Component {
  componentDidMount() {
    tippy(".description", {
      placement: "bottom",
      animation: "scale",
      arrow: true
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

  render() {
    const { weatherData } = this.props;
    return (
      <div className="weather-card">
        <section className="header">{this.cardDate()}</section>
        <section className="content">
          <WeatherDetails data={weatherData} />
        </section>
        <section className="timeline">
          {weatherData.map(data => (
            <div key={data.dt} className="weather-entry">
              <div className="time">{moment.unix(data.dt).format("h:mma")}</div>
              <div className="description" title={data.weather[0].description}>
                <Icon icon={data.weather[0].icon} />
              </div>
            </div>
          ))}
        </section>
      </div>
    );
  }
}

export default WeatherCard;
