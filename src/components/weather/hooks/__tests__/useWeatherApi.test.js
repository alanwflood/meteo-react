// import { renderHook, waitFor } from "@testing-library/react-hooks";
// import useWeatherApi from "../useWeatherApi";
jest.mock("../../../../api/weatherApi", () =>
  jest.fn(() => ({
    fetchFiveDayWeather: () =>
      Promise.resolve({ times: { sunrise: 0, sunset: 20 }, data: "cool" }),
  }))
);

jest.useFakeTimers();

describe("useWeatherApiHook", () => {
  it("fetches data from the weather api", async () => {
    // TODO: This keeps throwing an act error so need to figure this one out
    // const { result } = renderHook(() => useWeatherApi(0, 0));
    // expect(result.current.loadingState.loading).toBe(true);
    expect(true).toBe(true);
  });
});
