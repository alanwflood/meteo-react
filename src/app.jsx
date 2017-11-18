import React from "react";
import ReactDOM from "react-dom";
// Styles
import "./assets/stylesheets/application.styl";
import MainLayout from "./layouts/main";

const App = () => <MainLayout>This works!</MainLayout>;

export default () => {
  ReactDOM.render(<App />, document.getElementById("app"));
};
