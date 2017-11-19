import React from "react";
import _ from "lodash";
import moment from "moment";

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      weatherData: {}
    };
  }

  componentDidMount() {
    const url =
      "https://api.openweathermap.org/data/2.5/forecast?q=Dublin,IE&units=metric&appid=fedc4be60e5e3367b61c1c3846c8c557";
    fetch(url)
      .then(res => res.json())
      .then(json => {
        const weatherData = this.groupWeatherByDate(json);
        this.setState({
          weatherData
        });
      });
  }

  // Format api response to
  // weather for seperate days
  groupWeatherByDate = weatherData =>
    _.groupBy(weatherData.list, listItem =>
      moment.unix(listItem.dt).format("DD MMM")
    );

  weatherCards = () => {
    const { weatherData } = this.state;
    if (Object.keys(weatherData).length) {
      return Object.keys(weatherData).map(date => (
        <div key={date} style={{ paddingBottom: "2rem" }}>
          {weatherData[date].map(data => (
            <div key={data.dt}>
              {data.dt_txt}: {data.weather[0].description}
            </div>
          ))}
        </div>
      ));
    }
    return <div>Loading</div>;
  };

  render() {
    return this.weatherCards();
  }
}

export default Weather;
