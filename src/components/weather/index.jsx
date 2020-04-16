import React from "react";
import PropTypes from "prop-types";
import WeatherCard from "./card";
import ErrorBoundary from "./error-boundary";
import useWeatherApi from "./hooks/useWeatherApi";

export default function Weather({ lat, lng }) {
  const { loadingState, weatherData, theme } = useWeatherApi(lat, lng);

  if (loadingState.loading && loadingState.showLoader) {
    return <div className="loader main-loader">Loading</div>;
  } else if (Object.keys(weatherData).length > 0) {
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
  } else {
    return null;
  }
}

Weather.propTypes = {
  lat: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  lng: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
