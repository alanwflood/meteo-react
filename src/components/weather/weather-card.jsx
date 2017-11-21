import React from "react";
import moment from "moment";

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
      <div className="header">{cardDate()}</div>
      <div className="content">
        {props.weatherData.map(data => (
          <div key={data.dt}>
            {moment.unix(data.dt).format("h:mma")}:{" "}
            {data.weather[0].description}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherCard;
