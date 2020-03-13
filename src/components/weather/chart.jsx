import React from "react";
import PropTypes from "prop-types";
import Chart from "chart.js";
import colors from "../../assets/stylesheets/colors.json";

class WeatherChart extends React.Component {
  componentDidMount() {
    const fontColor = () => {
      if (this.props.theme === "light") {
        return colors.gray;
      }
      return colors.white;
    };
    const ctx = this.canvas.getContext("2d");
    this.chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: this.props.yAxes,
        datasets: [
          {
            label: this.props.label,
            data: this.props.xAxes,
            backgroundColor: this.props.barColor,
            borderColor: this.props.barBorderColor
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        },
        scales: {
          xAxes: [
            {
              ticks: {
                fontColor: fontColor()
              },
              gridLines: {
                display: false
              }
            }
          ],
          yAxes: [
            {
              gridLines: {
                display: false
              },
              ticks: {
                fontColor: fontColor(),
                beginAtZero: true,
                callback: value => `${value.toFixed(2)}${this.props.unit}`
              }
            }
          ]
        }
      }
    });
  }

  componentWillUnmount() {
    this.chart = null;
  }

  render() {
    return (
      <div className="weather-chart">
        <canvas
          ref={canvas => {
            this.canvas = canvas;
          }}
        />
      </div>
    );
  }
}
export default WeatherChart;

WeatherChart.propTypes = {
  barBorderColor: PropTypes.string,
  barColor: PropTypes.string,
  label: PropTypes.string,
  theme: PropTypes.string,
  unit: PropTypes.string,
  xAxes: PropTypes.arrayOf(PropTypes.number).isRequired,
  yAxes: PropTypes.arrayOf(PropTypes.string).isRequired
};

WeatherChart.defaultProps = {
  barBorderColor: "gray",
  barColor: "gray",
  label: "",
  theme: "light",
  unit: ""
};
