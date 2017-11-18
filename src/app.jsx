import React from "react";
import ReactDOM from "react-dom";
import "./assets/stylesheets/application.styl";

const App = () => <div>This works!</div>;

export default () => {
  ReactDOM.render(<App />, document.getElementById("app"));
};
