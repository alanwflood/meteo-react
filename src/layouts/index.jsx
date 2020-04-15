import React, { Suspense, useState } from "react";
import Logo from "../components/logo";

// Lazy Load weather component
const Weather = React.lazy(() => import("../components/weather"));
const SearchBar = React.lazy(() => import("../components/searchbar/searchbar"));

// Keys for local storage
const ADDRESS_KEY = "address";
const LAT_KEY = "lat";
const LNG_KEY = "lng";

export default function Main() {
  const [{ lat, lng, address }, setState] = useState({
    lat: localStorage.getItem(LAT_KEY) || null,
    lng: localStorage.getItem(LNG_KEY) || null,
    address: JSON.parse(localStorage.getItem(ADDRESS_KEY) || null) || "",
  });

  const handleSearchSubmit = ({ lat, lng }, address) => {
    localStorage.setItem(LAT_KEY, JSON.stringify(lat));
    localStorage.setItem(LNG_KEY, JSON.stringify(lng));
    localStorage.setItem(ADDRESS_KEY, JSON.stringify(address));

    setState({
      lat: String(lat),
      lng: String(lng),
      address: address,
    });
  };

  return (
    <main className="main-content">
      <Suspense fallback={null}>
        <SearchBar onSubmit={handleSearchSubmit} address={address} />
      </Suspense>
      {lat && lng ? (
        <Suspense fallback={null}>
          <Weather lat={lat} lng={lng} address={address} />
        </Suspense>
      ) : (
        <Logo />
      )}
    </main>
  );
}
