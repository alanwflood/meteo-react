import React from "react";
import PropTypes from "prop-types";

const MainLayout = props => (
  <div className="main-content">{props.children}</div>
);

MainLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default MainLayout;
