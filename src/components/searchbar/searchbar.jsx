import React, { useState } from "react";
import PropTypes from "prop-types";
import NavIcon from "../../assets/arrow.svg";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

/**
 * @component
 * @example
 * const onSubmit = (latLng, address) => {}
 * const address = "Dublin, Ireland"
 * return (
 *   <SearchBar onSubmit={onSubmit} address={address} />
 * )
 */
export default function SearchBar({ onSubmit, address: initialAddress }) {
  const [address, setAddress] = useState(initialAddress);

  function handleFormSubmit(event) {
    event.preventDefault();
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        onSubmit(latLng, address);
      })
      .catch(error => console.error("Error", error));
  }

  return (
    <form onSubmit={handleFormSubmit} className="search">
      <PlacesAutocomplete
        value={address}
        onChange={address => setAddress(address)}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className="search-bar">
            <input
              {...getInputProps({
                placeholder: "Search Places ...",
                className: "search-input"
              })}
            />
            <div className="search-dropdown">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: "#fafafa", cursor: "pointer" }
                  : { backgroundColor: "#ffffff", cursor: "pointer" };
                return (
                  <div
                    key={suggestion.id}
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>

      <button type="submit">
        <NavIcon />
      </button>
    </form>
  );
}

SearchBar.propTypes = {
  /**
   * Function to handle when the SearchBar submits
   * returning Lat/Long and the Address
   */
  onSubmit: PropTypes.func.isRequired,
  /**
   * The initial address the SearchBar uses
   */
  address: PropTypes.string
};

SearchBar.defaultProps = {
  address: ""
};
