import React from "react";
import { render } from "@testing-library/react";
import Weather from "../index";
import useWeatherApi from "../hooks/useWeatherApi";

jest.mock("../hooks/useWeatherApi");
jest.mock("../card", () => {
  return {
    __esModule: true,
    A: true,
    default: () => {
      return <div />;
    },
  };
});

describe("Weather Component", () => {
  it("Shows nothing when loading and showloader is false", () => {
    useWeatherApi.mockReturnValue({
      weatherData: {},
      loadingState: {
        loading: true,
        showLoader: false,
      },
      theme: "light",
    });
    const { container } = render(<Weather lat={0} lng={0} />);
    expect(container).toMatchSnapshot();
  });

  it("Shows a loader when loading", () => {
    useWeatherApi.mockReturnValue({
      weatherData: {},
      loadingState: {
        loading: true,
        showLoader: true,
      },
      theme: "light",
    });
    const { container } = render(<Weather lat={0} lng={0} />);
    expect(container).toMatchSnapshot();
  });

  it("Renders when data returns from api", () => {
    useWeatherApi.mockReturnValue({
      weatherData: {
        key: 1,
        otherKey: 2,
      },
      loadingState: {
        loading: false,
        showLoader: false,
      },
      theme: "light",
    });
    const { container } = render(<Weather lat={0} lng={0} />);
    expect(container).toMatchSnapshot();
  });
});
