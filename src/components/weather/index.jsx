import React from "react";
import PropTypes from "prop-types";
import WeatherAPI from "../../api/weatherApi";
import { add, getUnixTime, startOfDay } from "date-fns";
import WeatherCard from "./card";
import SetTheme from "./setTheme";
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

  static propTypes = {
    lat: PropTypes.string.isRequired,
    lng: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired
  }

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
        SetTheme(
          json.dt,
          parseInt(json.sys.sunset),
          parseInt(json.sys.sunrise),
          theme => this.setState({ theme })
        );
      })
    ]);
  }

  componentDidMount() {
    this.fetchWeather();
  }

  componentDidUpdate(prevProps) {
     if (prevProps.address !== this.props.address) {
      this.fetchWeather();
     }
   }

  todaysWeatherData = weatherData => {
    const weatherToday = weatherData[this.today];
    // Today's weather is not always 6 entries long,
    // so use tomorrows weather to fill in the gaps
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
    const { lat, lng } = this.props;
    const { weatherData, theme } = this.state;

    if (Object.keys(weatherData).length > 0) {
      return Object.keys(weatherData).map((date, index) => {
        const key = `${date}-${lat}-${lng}`
        return(
          <ErrorBoundary key={key}>
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
        )
      });
    }

    // We delay showing the loader so the user doesn't
    // percieve that a request is happening.
    return this.state.showLoader ? (
      <div className="loader main-loader">Loading</div>
    ) : null;
  };

  render() {
    const className = `weather-container ${this.state.theme}`
    return (
      <div className={className}>
        {this.weatherCards()}
      </div>
    );
  }
}

export default Weather;
