import React from "react";
import PropTypes from "prop-types";

import ClearDay from "./icons/01d.svg";
import ClearNight from "./icons/01n.svg";
import Day from "./icons/02d.svg";
import Night from "./icons/02n.svg";
import CloudyDay from "./icons/03d.svg";
import CloudyNight from "./icons/03n.svg";
import Cloudy from "./icons/04.svg";
import Rain from "./icons/09.svg";
import HeavyRain from "./icons/10.svg";
import Storm from "./icons/11.svg";
import Snow from "./icons/13.svg";
import Hail from "./icons/50.svg";

/**
 * @param {string} [iconName = ""]
 * @return {ReactElement}
 */
function GetIcon(iconName = "") {
  // We don't really care about icons where
  // the sun/moon aren't visible so cut
  // off their day/night value
  const iconValue = iconName.replace(/(d|n)/g, "");
  if (parseInt(iconName, 10) > 3) iconName = iconValue;

  switch (iconName) {
    case "01d":
      return <ClearDay />;
    case "01n":
      return <ClearNight />;
    case "02d":
      return <Day />;
    case "02n":
      return <Night />;
    case "03d":
      return <CloudyDay />;
    case "03n":
      return <CloudyNight />;
    case "04":
      return <Cloudy />;
    case "09":
      return <Rain />;
    case "10":
      return <HeavyRain />;
    case "11":
      return <Storm />;
    case "13":
      return <Snow />;
    case "50":
      return <Hail />;
    default:
      return <Day />;
  }
}

/**
 * @Component
 */
export default function WeatherIcon({ icon }) {
  return <div className="icon weather-icon">{GetIcon(icon)}</div>;
}

WeatherIcon.propTypes = {
  icon: PropTypes.string,
};
