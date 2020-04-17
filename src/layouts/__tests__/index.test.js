import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import App from "../index";

jest.mock("../../components/weather", () => () => <div />);
jest.mock(
  "@googlemaps/js-api-loader",
  () => require.requireActual("../../../tests/googleMapsApiLoaderMock").default
);
jest.mock(
  "react-places-autocomplete",
  () =>
    require.requireActual("../../../tests/reactPlacesAutocompleteMock").default
);

describe("Main Layout", () => {
  beforeEach(() => {
    window.google = {};
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(() => null),
      },
      writable: true,
    });
  });

  it("on initial load it shows a logo and searchbar", () => {
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });

  it("calls localStorage getItem 3 times on render", async () => {
    render(<App />);
    expect(window.localStorage.getItem).toHaveBeenCalledTimes(3);
  });

  it("after searching it calls localStorage setItem", async () => {
    jest.useFakeTimers();
    const { container } = render(<App />);
    const button = container.querySelector("button");
    fireEvent.click(button);
    // Wait for promise to complete
    await waitFor(() => {
      expect(window.localStorage.setItem).toHaveBeenCalledTimes(3);
      expect(container).toMatchSnapshot();
    });
  });
});
