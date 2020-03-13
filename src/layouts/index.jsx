import React, { Suspense, useState } from "react";
import SearchBar from "../components/searchbar/searchbar";
import Logo from "../components/logo";

// Lazy Load weather component
const Weather = React.lazy(() => import("../components/weather"));

// Keys for local storage
const ADDRESS_KEY = "address";
const LAT_KEY = "lat";
const LNG_KEY = "lng";

export default function Main() {
  const [location, setLocation] = useState({
    lat: localStorage.getItem(LAT_KEY) || null,
    lng: localStorage.getItem(LNG_KEY) || null
  });
  // JSON.parse removes quotation marks from the string
  const address = JSON.parse(localStorage.getItem(ADDRESS_KEY));

  const handleSearchSubmit = (latLng, address) => {
    const setValue = (key, string) =>
      localStorage.setItem(key, JSON.stringify(string));
    setLocation(latLng);
    setValue(LAT_KEY, latLng.lat);
    setValue(LNG_KEY, latLng.lng);
    setValue(ADDRESS_KEY, address);
  };

  return (
    <main className="main-content">
      <SearchBar onSubmit={handleSearchSubmit} address={address} />
      {location.lat && location.lng ? (
        <Suspense fallback={null}>
          <Weather lat={location.lat} lng={location.lng} address={address} />
        </Suspense>
      ) : (
        <Logo />
      )}
    </main>
  );
}
