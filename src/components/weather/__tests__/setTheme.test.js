import setTheme from "../setTheme";
import { getUnixTime } from "date-fns";

describe("SetTheme", () => {
  it("Sets theme to light when current time is greater than sunrise and less than sunset times", () => {
    const callback = jest.fn();
    const sunrise = getUnixTime(new Date()) - 10;
    const sunset = sunrise + 20;
    setTheme({ sunrise, sunset }, callback);
    expect(callback).toHaveBeenCalledWith("light");
  });
  it("Sets theme to dark when current time is less than sunrise", () => {
    const callback = jest.fn();
    const sunrise = getUnixTime(new Date()) + 10;
    const sunset = sunrise + 20;
    setTheme({ sunrise, sunset }, callback);
    expect(callback).toHaveBeenCalledWith("dark");
  });
  it("Sets theme to dark when current time is greater than sunset", () => {
    const callback = jest.fn();
    const sunrise = getUnixTime(new Date()) - 10;
    const sunset = sunrise - 20;
    setTheme({ sunrise, sunset }, callback);
    expect(callback).toHaveBeenCalledWith("dark");
  });
});
