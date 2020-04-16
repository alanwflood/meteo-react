import mockWeatherResponse from "./mockWeatherResponse.json";
import convertWeatherData from "../weatherConversion";

describe("weatherConversion", () => {
  it("Converts json from a a 5 day weather api call to the correct shape", () => {
    global.Date = class extends Date {
      constructor(...args) {
        if (args.length > 0) {
          // eslint-disable-next-line constructor-super, no-constructor-return
          return super(...args);
        }
        // eslint-disable-next-line no-constructor-return
        return new Date("2020-04-16T11:00:00Z");
      }
    };

    const subject = convertWeatherData;
    expect(subject(mockWeatherResponse)).toMatchSnapshot();
  });
});
