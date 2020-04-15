import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import NavIcon from "../../assets/arrow.svg";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";


/**
 * Load Google Maps script into DOM and ensure it's loaded before rendering children elements
 * @component
 * @example
 * <LoadGoogleMaps>This text will only show when Google Maps is loaded!</LoadGoogleMaps>
 */
function LoadGoogleMaps({children}) {
  const [gmapsLoaded, setGmapsLoaded] = useState(Boolean(window.google))
  useEffect(() => {
    if (!gmapsLoaded) {
      window.initMap = setGmapsLoaded(true)
      const googleMapScriptElement = document.createElement(`script`)
      const key = process.env.GOOGLE_API_KEY
      googleMapScriptElement.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places&callback=initMap`
      document.querySelector(`body`).insertAdjacentElement(`beforeend`, googleMapScriptElement)
    }
  })
  return gmapsLoaded && <>{children}</>;
}
LoadGoogleMaps.propTypes = {
  children: PropTypes.node
}

/**
 * The autocomplete searchbar at the top of the page.
 *
 * @component
 * @example
 * const onSubmit = (latLng, address) => {}
 * const address = "Dublin, Ireland"
 * return (
 *   <SearchBar onSubmit={onSubmit} address={address} />
 * )
 */
export default function SearchBar({onSubmit, address: initialAddress}) {
  const [address, setAddress] = useState(initialAddress);

  function handleFormSubmit(event) {
    if (event) event.preventDefault()
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        onSubmit(latLng, address);
      })
      .catch(error => console.error("Error", error));
  }

  return (
    <LoadGoogleMaps>
      <form onSubmit={handleFormSubmit} className="search">
        <PlacesAutocomplete
          value={address}
          onChange={address => setAddress(address)}
          onSelect={address => {
            setAddress(address);
            handleFormSubmit();
          }}
        >
          {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
            <div className="search-bar">
              <input
                {...getInputProps({
                  placeholder: "Search Places ...",
                  className: "search-input"
                })}
              />
              <div className="search-dropdown">
                {suggestions.map(suggestion => {
                  const className = `search-item ${suggestion.active ? " active" : ""}`
                  return (
                    <div
                      key={suggestion.id}
                      {...getSuggestionItemProps(suggestion, {className})}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
                {loading && <div className="loading">Loading Places...</div>}
              </div>
            </div>
          )}
        </PlacesAutocomplete>

        <button type="submit" aria-label="Fetch weather at location">
          <span>Search</span>
          <NavIcon />
        </button>
      </form>
    </LoadGoogleMaps>
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
