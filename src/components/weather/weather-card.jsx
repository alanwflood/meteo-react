import React from "react";
import moment from "moment";
import WeatherDetails from "./weather-details";
import Icon from "./weather-icon";

const WeatherCard = props => {
  const cardDate = () => {
    const format = dateToFormat => dateToFormat.format("Do MMMM");
    const date = format(moment.unix(props.date));
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

  return (
    <div className="weather-card">
      <section className="header">{cardDate()}</section>
      <section className="content">
        <WeatherDetails data={props.weatherData} />
      </section>
      <section className="timeline">
        {props.weatherData.map(data => (
          <div key={data.dt} className="weather-entry">
            <div className="time">{moment.unix(data.dt).format("h:mma")}</div>
            <div
              className="description"
              aria-label={data.weather[0].description}
            >
              <Icon icon={data.weather[0].icon} />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default WeatherCard;
