import { useState, useEffect } from "react";
import WeatherAPI from "../../../api/weatherApi";
import SetDocumentTheme from "../setTheme";

export default function useWeatherApi(lat, lng) {
  const [loadingState, setLoadingState] = useState({
    loading: false,
    showLoader: false,
  });
  const [weatherData, setWeatherData] = useState({});
  const [theme, setTheme] = useState("light");
  const api = WeatherAPI(lat, lng);

  useEffect(() => {
    setLoadingState({ loading: true, showLoader: false });
    const delayLoader = setTimeout(
      () => setLoadingState({ loading: true, showLoader: true }),
      3000
    );

    api
      .fetchFiveDayWeather(({ data, times }) => {
        setWeatherData(data);
        SetDocumentTheme({ ...times }, (theme) => setTheme(theme));
      })
      .then(() => {
        clearTimeout(delayLoader);
        setLoadingState({ loading: false, showLoader: false });
      });

    return () => {
      clearTimeout(delayLoader);
    };
  }, [lat, lng]);

  return {
    loadingState,
    weatherData,
    theme,
  };
}
