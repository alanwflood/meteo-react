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
      weatherData: {},
      lat: this.props.lat,
      lng: this.props.lng
    };
    this.today = moment().format("DD MMM");
    this.tomorrow = moment()
      .add(1, "days")
      .format("DD MMM");
  }

  componentDidMount() {
    this.fetchWeather();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      lat: nextProps.lat,
      lng: nextProps.lng
    });
    this.fetchWeather();
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
      document.body.classList.add("light");
      document.body.classList.remove("dark");
    } else {
      theme = "dark";
      document.body.classList.add("dark");
      document.body.classList.remove("light");
    }
    this.setState({ theme });
  };

  fetchWeather = () => {
    const url = "https://api.openweathermap.org/data/2.5/";
    const { lat, lng } = this.state;
    const apiKey = "fedc4be60e5e3367b61c1c3846c8c557";
    // prettier-ignore
    const forecastURL = `${url}forecast?lat=${lat}&lon=${lng}&units=metric&appid=${apiKey}`;
    this.fetch5DayWeather(forecastURL);
    // prettier-ignore
    const weatherURL = `${url}weather?lat=${lat}&lon=${lng}&units=metric&appid=${apiKey}`;
    this.fetchCurrentWeather(weatherURL);
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
    const { weatherData, theme } = this.state;
    if (Object.keys(weatherData).length) {
      return Object.keys(weatherData).map((date, index) => (
        <ErrorBoundary key={date}>
          <WeatherCard
            today={this.today === date}
            weatherData={
              date === this.today
                ? this.todaysWeatherData(weatherData)
                : weatherData[date]
            }
            theme={theme}
            date={weatherData[date][0].dt}
            isOpen={index === 0}
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
