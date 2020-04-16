import React from "react";
import { render } from "@testing-library/react";
import WeatherTimeline from "../timeline";
import { getUnixTime, addHours } from "date-fns";

describe("Weather Timeline", () => {
  // 1pm @ 27th September 2010
  const date = new Date(2010, 8, 27, 13, 0, 0);
  const mockWeatherData = {
    times: [
      getUnixTime(date),
      getUnixTime(addHours(date, 3)),
      getUnixTime(addHours(date, 6)),
    ],
    icons: ["01d", "01d", "01d"],
    descriptions: ["Sunny", "Clear", "Delightful"],
  };

  it("Renders correctly", () => {
    const { container } = render(
      <WeatherTimeline weatherData={mockWeatherData} />
    );
    expect(container).toMatchSnapshot();
  });

  it("Shows correct times in timeline", () => {
    const { getByText } = render(
      <WeatherTimeline weatherData={mockWeatherData} />
    );
    expect(getByText("1:00PM")).toBeTruthy();
    expect(getByText("4:00PM")).toBeTruthy();
    expect(getByText("7:00PM")).toBeTruthy();
  });
});
