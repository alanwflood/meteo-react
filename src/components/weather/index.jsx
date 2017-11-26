import React from "react";
import _ from "lodash";
import moment from "moment";
import WeatherCard from "./weather-card";
import ErrorBoundary from "./error-boundary";

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      theme: "light",
      currentWeather: {},
      weatherData: {}
    };
    this.today = moment().format("DD MMM");
    this.tomorrow = moment()
      .add(1, "days")
      .format("DD MMM");
  }

  componentDidMount() {
    const url = "https://api.openweathermap.org/data/2.5/";
    const place = "Dublin,IE";
    const apiKey = "fedc4be60e5e3367b61c1c3846c8c557";
    // prettier-ignore
    const forecastURL = `${url}forecast?q=${place}&units=metric&appid=${apiKey}`;
    this.fetch5DayWeather(forecastURL);
    // prettier-ignore
    const weatherURL = `${url}weather?q=${place}&units=metric&appid=${apiKey}`;
    this.fetchCurrentWeather(weatherURL);
  }

  setTheme = () => {
    const currentTime = this.state.currentWeather.dt;
    const { sunset, sunrise } = this.state.currentWeather.sys;
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

  // Today's weather is not always 6 entries long,
  // so use tomorrows weather to fill in the gaps
  todaysWeatherData = weatherData => {
    const weatherToday = weatherData[this.today];
    if (weatherToday.length < 6) {
      const additionalForecast = weatherData[this.tomorrow].slice(
        0,
        8 - weatherToday.length
      );
      return weatherToday.concat(additionalForecast);
    }
    return weatherToday;
  };

  weatherCards = () => {
    const { weatherData } = this.state;
    if (Object.keys(weatherData).length) {
      return Object.keys(weatherData).map(date => (
        <ErrorBoundary key={date}>
          <WeatherCard
            today={this.today === date}
            weatherData={
              date === this.today
                ? this.todaysWeatherData(weatherData)
                : weatherData[date]
            }
            date={weatherData[date][0].dt}
          />
        </ErrorBoundary>
      ));
    }
    return <div className="loader main-loader">Loading</div>;
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
