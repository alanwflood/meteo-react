/**
 * Calculate app theme based on current, sunrise and sunset times
 *
 * @param {number} currentTime - Unix timestamp of current time
 * @param {number} sunsetTime - Unix timestamp of sunset time
 * @param {number} sunrise - Unix timestamp of sunrise time
 * @param {themeSetCallback} - callback which provides a string of the calculated theme
 *
 * @example
 * setTheme(1586521287, 1586521288, 1586521285, (theme) => {})
 */
export default function setTheme(currentTime, sunsetTime, sunriseTime, themeSetCallback) {
    if (currentTime > sunriseTime && currentTime < sunsetTime) {
      themeSetCallback("light")
      document.body.classList.add("light");
      document.body.classList.remove("dark");
    } else {
      themeSetCallback("dark")
      document.body.classList.add("dark");
      document.body.classList.remove("light");
    }
  };
