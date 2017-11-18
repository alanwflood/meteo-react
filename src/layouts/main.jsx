import React from "react";
import PropTypes from "prop-types";
import Header from "../components/header";
import Footer from "../components/footer";

const MainLayout = props => (
  <div>
    <Header />
    <div className="main-content">{props.children}</div>
    <Footer />
  </div>
);

MainLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default MainLayout;
