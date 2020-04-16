import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
// import Chart from "chart.js";
import { format, fromUnixTime } from "date-fns";
import { select, scaleBand, scaleLinear, max, axisBottom, axisLeft } from "d3";
import { zip } from "lodash";

/**
 * Creates a bar chart using provided data
 *
 * @param {HTMLElement} element - Element to attach the chart to
 * @param {number[]} xAxisData
 * @param {number[]} yAxisData
 * @param {string} barColor - Color used for the bars in the chart
 * @param {string} unit - Concatenated to the yAxis data set
 * @returns {undefined}
 * @example
 * SetupChart(
 *   document.querySelector("svg"),
 *   [1, 2, 3, 4],
 *   [5, 6, 7, 8],
 *   #424242,
 *   "mm"
 * )
 */
function SetupChart(element, xAxisData, yAxisData, barColor, unit) {
  const data = zip(xAxisData, yAxisData).map((pair) => ({
    value: Number(pair[0]),
    time: Number(pair[1]),
  }));

  const svg = select(element);
  const margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 50,
  };
  const width = +svg.attr("width") - margin.left - margin.right;
  const height = +svg.attr("height") - margin.top - margin.bottom;
  const g = svg
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var x = scaleBand().rangeRound([0, width]).padding(0.2);

  var y = scaleLinear().rangeRound([height, 0]);

  const maxValue = max(data, ({ value }) => value);

  x.domain(
    data.map(function (d) {
      return d.time;
    })
  );
  // If all the data is zero, just show 5 ticks on the yAxis
  y.domain([0, maxValue === 0 ? 5 : maxValue]);

  g.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(axisBottom(x).tickFormat((t) => format(fromUnixTime(t), "ha")))
    .selectAll("text")
    .attr("font-size", width * 0.002 + "em");

  g.append("g").call(axisLeft(y).tickFormat((t) => `${t}${unit}`));

  g.selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", ({ time }) => x(time))
    .attr("width", x.bandwidth())
    .attr("y", () => height)
    .attr("fill", barColor)
    .attr("height", 0)
    .transition()
    .duration(750)
    .delay((_d, i) => i * 150)
    .attr("y", ({ value }) => y(value))
    .attr("height", (d) => height - y(d.value));
}

/**
 * Returns a Component featuring a Bar Chart created using provided data
 *
 * @component
 * @example
 * <WeatherChart
 *   xAxis={[1, 2, 3, 4]}
 *   yAxis={[5, 6, 7, 8]}
 *   barColor="#424242""
 *   unit="mm"
 * />
 */
export default function WeatherChart({ barColor, unit, xAxis, yAxis }) {
  const chartRef = useRef(null);
  useEffect(() => {
    SetupChart(chartRef.current, xAxis, yAxis, barColor, unit);
  }, []);

  return (
    <div className="weather-chart">
      <svg width="960" height="500" viewBox="0 0 960 500" ref={chartRef} />
    </div>
  );
}

WeatherChart.propTypes = {
  //  Color used for the bars in the chart
  barColor: PropTypes.string,
  // Concatenated to the yAxis data set
  unit: PropTypes.string,
  //  xAxisData
  xAxis: PropTypes.arrayOf(PropTypes.number).isRequired,
  //  yAxisData
  yAxis: PropTypes.arrayOf(PropTypes.number).isRequired,
};

WeatherChart.defaultProps = {
  barColor: "gray",
  unit: "",
};
