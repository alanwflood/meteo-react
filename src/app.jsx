import React from "react";
import ReactDOM from "react-dom";
// Styles
import "./assets/stylesheets/application.styl";
import Search from "./components/searchbar";

const App = () => <Search />;

export default () => {
  ReactDOM.render(<App />, document.getElementById("app"));
};
