import React from "react";
import ReactDOM from "react-dom";
// Styles
import "./assets/stylesheets/application.styl";
import MainLayout from "./layouts/main";
import Search from "./components/searchbar";

const App = () => (
  <MainLayout>
    <Search />
  </MainLayout>
);

export default () => {
  ReactDOM.render(<App />, document.getElementById("app"));
};
