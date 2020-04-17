import React from "react";
import { render, waitFor } from "@testing-library/react";
import SearchBar from "../searchbar";
jest.mock(
  "@googlemaps/js-api-loader",
  () =>
    require.requireActual("../../../../tests/googleMapsApiLoaderMock").default
);
jest.mock(
  "react-places-autocomplete",
  () =>
    require.requireActual("../../../../tests/reactPlacesAutocompleteMock")
      .default
);

describe("SearchBar component", () => {
  const onSubmit = jest.fn();
  const address = "Dublin, Ireland";

  beforeEach(() => {
    window.google = {};
  });

  it("Renders correctly", () => {
    const { container } = render(
      <SearchBar onSubmit={onSubmit} address={address} />
    );
    expect(container).toMatchSnapshot();
  });

  it("Loads Google Maps Api on mount", async () => {
    window.google = undefined;
    render(<SearchBar onSubmit={onSubmit} address={address} />);
    await waitFor(() => {
      expect(window.google).toBe("Google Maps Loaded");
    });
  });
});
