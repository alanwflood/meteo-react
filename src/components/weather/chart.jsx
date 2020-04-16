import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
// import Chart from "chart.js";
import { format, fromUnixTime } from "date-fns";
import { select, scaleBand, scaleLinear, max, axisBottom, axisLeft } from "d3";
import { zip } from "lodash";

function SetupChart(element, xAxisData, yAxisData, barColor, theme, unit) {
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
  y.domain([0, maxValue === 0 ? 5 : maxValue]);

  g.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(axisBottom(x).tickFormat((t) => format(fromUnixTime(t), "ha")))
    .selectAll("text")
    .attr("font-size", width * 0.002 + "em");

  g.append("g").call(axisLeft(y).tickFormat((t) => `${t}${unit}`));

  // Eventually add additional text to chart
  // yAxis.append("text")
  //   .attr("fill", fontColor)
  //   .attr("transform", "rotate(-90)")
  //   .attr("y", 6)
  //   .attr("dy", "0.71em")
  //   .attr("text-anchor", "end")
  //   .text("Unit Goes Here")

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

export default function WeatherChart({ barColor, theme, unit, xAxes, yAxes }) {
  const chartRef = useRef(null);
  useEffect(() => {
    SetupChart(chartRef.current, xAxes, yAxes, barColor, theme, unit);
  }, []);

  return (
    <div className="weather-chart">
      <svg width="960" height="500" viewBox="0 0 960 500" ref={chartRef} />
    </div>
  );
}

WeatherChart.propTypes = {
  barColor: PropTypes.string,
  theme: PropTypes.string,
  unit: PropTypes.string,
  xAxes: PropTypes.arrayOf(PropTypes.number).isRequired,
  yAxes: PropTypes.arrayOf(PropTypes.number).isRequired,
};

WeatherChart.defaultProps = {
  barBorderColor: "gray",
  barColor: "gray",
  label: "",
  theme: "light",
  unit: "",
};
