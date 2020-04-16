import React from "react";
import ReactDOM from "react-dom";
import App from "./layouts";

export default function Application() {
  return ReactDOM.render(<App />, document.getElementById("app"));
}
