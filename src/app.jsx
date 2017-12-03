import React from "react";
import ReactDOM from "react-dom";
// Styles
import "./assets/stylesheets/application.styl";
import App from "./layouts";

export default () => {
  ReactDOM.render(<App />, document.getElementById("app"));
};
