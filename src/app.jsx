import React from "react";
import ReactDOM from "react-dom";
// Styles
import "./assets/stylesheets/application.styl";
// import MainLayout from "./layouts/main";
// import Title from "./components/logo";
import Weather from "./components/weather";

const App = () => (
  <div className="night-sky-bg">
    <Weather />
  </div>
);

export default () => {
  ReactDOM.render(<App />, document.getElementById("app"));
};
