import React from "react";
import ReactDOM from "react-dom";
// Styles
import "./assets/stylesheets/application.styl";
import MainLayout from "./layouts/main";
import Weather from "./components/weather";
import Search from "./components/searchbar";

const App = () => (
  <MainLayout>
    <Weather />
  </MainLayout>
);

export default () => {
  ReactDOM.render(<App />, document.getElementById("app"));
};
