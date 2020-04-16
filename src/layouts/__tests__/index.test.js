import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import App from "../index";
jest.mock("../../components/weather");
// Mock out places autocomplete
jest.mock("react-places-autocomplete", () => {
  const React = require("react"); // eslint-disable-line
  class PlacesAutocomplete extends React.Component {
    renderProps = {
      getInputProps: jest.fn(({ placeholder, className }) => ({
        placeholder,
        className,
      })),
      suggestions: [],
      getSuggestionItemProps: jest.fn(),
    };

    render() {
      // eslint-disable-next-line react/prop-types
      return <>{this.props.children(this.renderProps)}</>;
    }
  }

  return {
    __esModule: true,
    default: PlacesAutocomplete,
    geocodeByAddress: jest
      .fn()
      .mockImplementation(() => Promise.resolve("address")),
    getLatLng: jest.fn().mockImplementation(() => ({ lat: 0, lng: 0 })),
  };
});

describe("Main Layout", () => {
  beforeEach(() => {
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

  it("calls localStorage getItem 3 times on render", () => {
    render(<App />);
    expect(window.localStorage.getItem).toHaveBeenCalledTimes(3);
  });

  it("after searching it calls localStorage setItem", async () => {
    window.google = {};
    const { container } = render(<App />);
    const button = container.querySelector("button");
    fireEvent.click(button);
    // Wait for promise to complete
    await waitFor(() => {
      expect(window.localStorage.setItem).toHaveBeenCalledTimes(3);
      expect(container).toMatchSnapshot();
    }, 0);
  });
});
