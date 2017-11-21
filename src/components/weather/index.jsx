import React from "react";
import _ from "lodash";
import moment from "moment";
import WeatherCard from "./weather-card";

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      theme: "light",
      currentWeather: {},
      weatherData: {}
    };
  }

  componentDidMount() {
    const forecastURL =
      "https://api.openweathermap.org/data/2.5/forecast?q=Dublin,IE&units=metric&appid=fedc4be60e5e3367b61c1c3846c8c557";
    this.fetch5DayWeather(forecastURL);
    const weatherURL =
      "https://api.openweathermap.org/data/2.5/weather?q=Dublin,IE&units=metric&appid=fedc4be60e5e3367b61c1c3846c8c557";
    this.fetchCurrentWeather(weatherURL);
  }

  setTheme = () => {
    const currentTime = moment.unix();
    const { sunset, sunrise } = this.state.currentWeather;
    let theme;
    if (
      currentTime > parseInt(sunrise, 10) &&
      currentTime < parseInt(sunset, 10)
    ) {
      theme = "light";
    } else {
      theme = "dark";
    }
    this.setState({ theme });
  };

  weatherCards = () => {
    const { weatherData } = this.state;
    if (Object.keys(weatherData).length) {
      return Object.keys(weatherData).map(date => (
        <WeatherCard
          key={date}
          weatherData={weatherData[date]}
          date={weatherData[date][0].dt}
        />
      ));
    }
    return <div>Loading</div>;
  };

  fetchCurrentWeather = url => {
    fetch(url)
      .then(res => res.json())
      .then(json => {
        this.setState({
          currentWeather: json
        });
        this.setTheme();
      });
  };

  fetch5DayWeather = url => {
    fetch(url)
      .then(res => res.json())
      .then(json => {
        const weatherData = this.groupWeatherByDate(json);
        this.setState({
          weatherData
        });
      });
  };

  // Format api response to
  // weather for seperate days
  groupWeatherByDate = weatherData =>
    _.groupBy(weatherData.list, listItem =>
      moment.unix(listItem.dt).format("DD MMM")
    );

  render() {
    return (
      <div className={`weather-container ${this.state.theme}`}>
        <div className="background" />
        {this.weatherCards()}
      </div>
    );
  }
}

export default Weather;
