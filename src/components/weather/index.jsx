import React from "react";
import WeatherAPI from "../../api/weatherApi";
import { format, add, getUnixTime, startOfDay } from "date-fns";
import WeatherCard from "./card";
import ErrorBoundary from "./error-boundary";

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.loadTimer = setTimeout(this.enableLoader, 300);
    const date = startOfDay(new Date());
    this.today = getUnixTime(date).toString();
    this.tomorrow = getUnixTime(add(date, { days: 1 })).toString();
  }

  state = {
    showLoader: false,
    theme: "light",
    currentWeather: {},
    weatherData: {}
  };

  enableMessage() {
    this.setState({ showLoader: true });
  }

  fetchWeather() {
    const api = WeatherAPI(this.props.lat, this.props.lng);
    Promise.all([
      api.fetchFiveDayWeather(json => {
        this.setState({ weatherData: json });
      }),
      api.fetchCurrentWeather(json => {
        this.setState({ currentWeather: json });
        this.setTheme(json);
      })
    ]);
  }

  componentDidMount() {
    this.fetchWeather();
  }

  setTheme = json => {
    const currentTime = json.dt;
    const { sunset, sunrise } = json.sys;
    if (currentTime > parseInt(sunrise) && currentTime < parseInt(sunset)) {
      this.setState({ theme: "light" });
      document.body.classList.add("light");
      document.body.classList.remove("dark");
    } else {
      this.setState({ theme: "dark" });
      document.body.classList.add("dark");
      document.body.classList.remove("light");
    }
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
    if (Object.keys(weatherData).length > 0) {
      return Object.keys(weatherData).map((date, index) => (
        <ErrorBoundary key={date}>
          <WeatherCard
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
    return this.state.showLoader ? (
      <div className="loader main-loader">Loading</div>
    ) : null;
  };

  render() {
    return (
      <div className={`weather-container ${this.state.theme}`}>
        {this.weatherCards()}
      </div>
    );
  }
}

export default Weather;
