import React from "react";

/**
 * @component
 */
export default function Logo() {
  return (
    <div className="logo">
      <h1>
        <div>Meteo</div>
        <small>Weather at a Glance</small>
      </h1>
      <div className="tagline">
        Search for a location above to get your 5 day weather forecast!
      </div>
    </div>
  );
}
