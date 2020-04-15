import mockWeatherResponse from "./mockWeatherResponse.json";
import convertWeatherData from "../weatherConversion";

describe("weatherConversion", () => {
  it("Converts json from a a 5 day weather api call to the correct shape", () => {
    const subject = convertWeatherData;
    expect(subject(mockWeatherResponse)).toMatchSnapshot();
  });
});
