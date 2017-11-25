import React from "react";

export default class SearchBar extends React.Component {
  render() {
    return (
      <div>
        <input type="text" name="location" />
        <input type="submit" />
      </div>
    );
  }
}
