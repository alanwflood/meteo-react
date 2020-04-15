import WeatherConverter from "../weatherConversion";
import WeatherApi from "../weatherApi";
jest.mock("../weatherConversion");

describe("WeatherApi", () => {
  global.fetch = jest.fn();
  const mockSuccessResponse = {};
  const mockFetchPromise = Promise.resolve({
    json: () => mockJsonPromise,
  });
  const mockFetchError = Promise.reject(new Error("Fail"));
  const mockJsonPromise = Promise.resolve(mockSuccessResponse);

  it("can fetch a five day weather forecast", () => {
    jest.spyOn(global, "fetch").mockImplementation(() => mockFetchPromise);

    const subject = WeatherApi(0, 0);
    subject.fetchFiveDayWeather(jest.fn);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      `https://api.openweathermap.org/data/2.5/forecast?lat=0&lon=0&units=metric&appid=undefined`
    );
  });

  it("throws an error when it fails", () => {
    jest.spyOn(global, "fetch").mockImplementation(() => mockFetchError);
    console.error = jest.fn();

    const subject = WeatherApi(0, 0);
    subject.fetchFiveDayWeather().then(() => {
      expect(console.error).toHaveBeenCalledTimes(1);
    });
  });
});
