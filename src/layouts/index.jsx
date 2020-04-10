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
  const [lat, setLat] = useState(
    localStorage.getItem(LAT_KEY) || null,
  );
  const [lng, setLng] = useState(
    localStorage.getItem(LNG_KEY) || null
  );
  const [address, setAddress] = useState(
    // JSON.parse removes quotation marks from the string
    JSON.parse(localStorage.getItem(ADDRESS_KEY))
  );

  const handleSearchSubmit = ({lat, lng}, address) => {
    const setValue = (key, string) => localStorage.setItem(key, JSON.stringify(string));
    setLat(lat);
    setLng(lng);
    setAddress(address);

    setValue(LAT_KEY, lat);
    setValue(LNG_KEY, lng);
    setValue(ADDRESS_KEY, address);
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
