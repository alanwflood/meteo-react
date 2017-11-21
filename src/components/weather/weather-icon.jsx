import React from "react";
import icons from "./icons.json";

export default props => {
  const setIcon = () => {
    const { icon } = props;
    const iconValue = icon.replace(/(d|n)/g, "");
    if (parseInt(iconValue, 10) > 3) {
      return iconValue;
    }
    return props.icon;
  };

  return (
    <div className="icon">
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g fill="currentColor">
          <path d={icons[setIcon()]} />
        </g>
      </svg>
    </div>
  );
};
