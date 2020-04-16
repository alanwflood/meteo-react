import React from "react";

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

export default {
  __esModule: true,
  default: PlacesAutocomplete,
  geocodeByAddress: jest
    .fn()
    .mockImplementation(() => Promise.resolve("address")),
  getLatLng: jest.fn().mockImplementation(() => ({ lat: 0, lng: 0 })),
};
