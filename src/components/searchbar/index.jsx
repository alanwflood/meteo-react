import React from "react";
import Weather from "../weather";

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: []
    };
  }

  render() {
    const { location } = this.state;
    return (
      <div>
        <div>
          <input type="text" name="location" />
          <input type="submit" />
        </div>
        <div>
          {!!location.length && (
            <Weather lat={location[0]} long={location[1]} />
          )}
        </div>
      </div>
    );
  }
}
