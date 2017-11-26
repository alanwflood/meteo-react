import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import MainLayout from "../../layouts/main";
import Weather from "../weather";
import Logo from "../logo";

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {},
      address: ""
    };
  }

  onChange = address => this.setState({ address });

  handleFormSubmit = event => {
    event.preventDefault();
    this.setState({ location: {} });
    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => this.setState({ location: latLng }))
      .catch(error => console.error("Error", error));
  };

  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
      placeholder: "Enter a location then hit submit!"
    };
    const { address } = this.state;
    return (
      <MainLayout>
        <form
          onSubmit={this.handleFormSubmit}
          className="search"
          ref={form => {
            this.form = form;
          }}
        >
          <PlacesAutocomplete
            inputProps={inputProps}
            googleLogo={false}
            classNames={{
              root: "search-bar",
              input: "search-input"
            }}
            onEnterKeyDown={() => this.form.dispatchEvent(new Event("submit"))}
          />

          <button type="submit">Submit</button>
        </form>
        {(!!Object.keys(this.state.location).length && (
          <Weather
            lat={this.state.location.lat}
            lng={this.state.location.lng}
          />
        )) || <Logo />}
      </MainLayout>
    );
  }
}
