import React from "react";
import { render } from "@testing-library/react";
import SearchBar from "../searchbar";

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

describe("SearchBar component", () => {
  it("Renders correctly", () => {
    window.google = {};
    const onSubmit = jest.fn();
    const address = "Dublin, Ireland";
    const { container } = render(
      <SearchBar onSubmit={onSubmit} address={address} />
    );
    expect(container).toMatchSnapshot();
  });
});
