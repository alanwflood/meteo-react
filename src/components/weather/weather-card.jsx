import React from "react";
import moment from "moment";
import { Collapse } from "react-collapse";
import tippy from "tippy.js";
import _ from "lodash";
import WeatherDetails from "./weather-details";
import Icon from "./weather-icon";

class WeatherCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpened: false
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

  render() {
    const { weatherData } = this.props;
    return (
      <div>
        <button
          onClick={() => this.setState({ isOpened: !this.state.isOpened })}
        >
          Open Me
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
