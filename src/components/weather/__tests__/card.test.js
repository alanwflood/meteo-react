import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { getUnixTime } from "date-fns";
import Card from "../card";

describe("Weather Card Component", () => {
  // 1pm @ 27th September 2010
  const date = getUnixTime(new Date(2010, 8, 27, 13, 0, 0));
  const weatherData = {
    times: [1587427200, 1587438000, 1587448800, 1587459600],
    avgWeather: { icon: "10n", description: "light rain" },
    descriptions: ["light rain", "moderate rain", "light rain", "light rain"],
    icons: ["10n", "10n", "10d", "10d"],
    displayName: null,
    temps: { min: "8°C", max: "9°C", avg: "8°C", data: [1, 2, 3, 4] },
    wind: { avg: "8.38m/s", direction: "ENE", data: [1, 2, 3, 4] },
    snow: { avg: "0.00mm", data: [0, 0, 0, 0] },
    rain: { avg: "1.98mm", data: [0, 0, 0, 0] },
    humidity: { avg: "89.75%", data: [60, 70, 80, 90] },
  };
  it("Renders correctly", () => {
    const { container } = render(
      <Card isOpen weatherData={weatherData} date={date} theme="light" />
    );
    expect(container).toMatchSnapshot();
  });

  it("Opens the card when the weather button is clicked", () => {
    const { getAllByText, getByText } = render(
      <Card
        isOpen={false}
        weatherData={weatherData}
        date={date}
        theme="light"
      />
    );
    const button = getAllByText("27th September");
    fireEvent.click(button[0]);
    waitFor(() => expect(getByText("Light Rain")).toBeTruthy());
  });

  it("Shows the displayName when one is available", () => {
    const displayName = "This is a display name";
    const mockData = { ...weatherData, displayName };
    const { getByText } = render(
      <Card isOpen weatherData={mockData} date={date} theme="light" />
    );
    expect(getByText(displayName)).toBeTruthy();
  });
});
