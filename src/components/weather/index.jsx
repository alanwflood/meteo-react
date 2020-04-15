import React from "react";
import PropTypes from "prop-types";
import WeatherAPI from "../../api/weatherApi";
import WeatherCard from "./card";
import SetTheme from "./setTheme";
import ErrorBoundary from "./error-boundary";

class Weather extends React.Component {
  state = {
    showLoader: false,
    theme: "light",
    weatherData: {},
  };

  static propTypes = {
    lat: PropTypes.string.isRequired,
    lng: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
  };

  enableLoader() {
    setTimeout(this.setState({ showLoader: true }), 3000);
  }

  fetchWeather() {
    this.setState({ loading: true });
    this.enableLoader();
    const api = WeatherAPI(this.props.lat, this.props.lng);
    api
      .fetchFiveDayWeather(({ data, times }) => {
        this.setState({ weatherData: data });
        SetTheme({ sunrise: times.sunrise, sunset: times.sunset }, (theme) =>
          this.setState({ theme })
        );
      })
      .then(() => {
        this.setState({ loading: false });
      });
  }

  componentDidMount() {
    this.fetchWeather();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.address !== this.props.address) this.fetchWeather();
  }

  weatherCards = () => {
    const { lat, lng } = this.props;
    const { loading, weatherData, theme } = this.state;

    if (loading) {
      // We delay showing the loader so the user doesn't
      // percieve that a request is happening.
      return this.state.showLoader ? (
        <div className="loader main-loader">Loading</div>
      ) : null;
    }

    if (Object.keys(weatherData).length > 0) {
      return Object.entries(weatherData).map(([date, weatherData], index) => (
        <ErrorBoundary key={`${date}-${lat}-${lng}`}>
          <WeatherCard
            weatherData={weatherData}
            theme={theme}
            date={date}
            isOpen={index === 0}
          />
        </ErrorBoundary>
      ));
    }
  };

  render() {
    const className = `weather-container ${this.state.theme}`;
    return <div className={className}>{this.weatherCards()}</div>;
  }
}

export default Weather;
