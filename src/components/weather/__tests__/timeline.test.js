import React from "react";
import { render } from "@testing-library/react";
import WeatherTimeline from "../timeline";

describe("Weather Timeline", () => {
  it("Renders correctly", () => {
    const mockWeatherData = {
      times: [1, 2, 3],
      icons: ["01d", "01d", "01d"],
      descriptions: ["Sunny", "Clear", "Delightful"],
    };
    const { container } = render(
      <WeatherTimeline weatherData={mockWeatherData} />
    );
    expect(container).toMatchSnapshot();
  });
});
