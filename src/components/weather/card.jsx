import React, {useState} from "react";
import PropTypes from "prop-types";
import {format, fromUnixTime} from "date-fns";
import {Collapse} from "react-collapse";

import Details from "./details";
import Icon from "./icon";
import Timeline from "./timeline";

function CardDate({date, displayName}) {
  const displayDate = format(fromUnixTime(date), "do MMMM");
  return (
    <span>
      {displayName ? (
          <>
            {displayName}
            < br />
            <small>{displayDate}</small>
          </>
        ) : displayDate
      }
    </span>
  );
};

export default function WeatherCard({
  isOpen: initialOpenState,
  weatherData,
  date: unixDate,
  theme
}) {
  const [isOpen, setIsOpen] = useState(initialOpenState)
  const date = fromUnixTime(unixDate);

  return (
    <div>
      <button
        className={`weather-button${isOpen ? " open" : ""}`}
        onClick={() =>  setIsOpen(!isOpen)}
      >
        <div className="button-content">
          <Icon icon={weatherData.avgWeather.icon} />
          <h2>
            {format(date, "do MMMM")}
            <br />
            <small>{format(date, "EEEE")}</small>
          </h2>
          <div className="details">
            <table>
              <tbody>
                <tr>
                  <td>Min</td>
                  <td>{weatherData.temps.min}</td>
                </tr>
                <tr>
                  <td>Max</td>
                  <td>{weatherData.temps.max}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </button>
      <Collapse isOpened={isOpen}>
        <div className="weather-card">
          <section className="header">
            <CardDate date={date} displayName={weatherData.displayName} />
          </section>
          <Details weatherData={weatherData} theme={theme} />
          <Timeline weatherData={weatherData} />
        </div>
      </Collapse>
    </div>
  );
}

// class WeatherCard extends React.Component {
//   constructor(props) {
//     super(props);
//
//     this.state = {
//       isOpened: this.props.isOpen,
//       // Seperation of concerns
//       detailsData: convertWeatherData(this.props.weatherData),
//       timelineData: this.props.weatherData
//     };
//   }
//
//   render() {
//     const {detailsData, timelineData} = this.state;
//     const date = fromUnixTime(this.props.date);
//     return (
//       <div>
//         <button
//           className={`weather-button${this.state.isOpened ? " open" : ""}`}
//           onClick={() => this.setState({isOpened: !this.state.isOpened})}
//         >
//           <div className="button-content">
//             <Icon icon={detailsData.avgWeather.icon} />
//             <h2>
//               {format(date, "do MMMM")}
//               <br />
//               <small>{format(date, "EEEE")}</small>
//             </h2>
//             <div className="details">
//               <table>
//                 <tbody>
//                   <tr>
//                     <td>Min</td>
//                     <td>{detailsData.temps.min}</td>
//                   </tr>
//                   <tr>
//                     <td>Max</td>
//                     <td>{detailsData.temps.max}</td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </button>
//         <Collapse isOpened={this.state.isOpened}>
//           <div className="weather-card">
//             <section className="header">{this.cardDate()}</section>
//             <Details weatherData={detailsData} theme={this.props.theme} />
//             <Timeline weatherData={timelineData} />
//           </div>
//         </Collapse>
//       </div>
//     );
//   }
// }
//
// WeatherCard.propTypes = {
//   isOpen: PropTypes.bool,
//   date: PropTypes.number.isRequired,
//   weatherData: PropTypes.arrayOf(PropTypes.object).isRequired
// };
//
// // Specifies the default values for props:
// WeatherCard.defaultProps = {
//   isOpen: false
// };
