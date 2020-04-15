import React from "react";
import PropTypes from "prop-types";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }
  componentDidCatch() {
    this.setState({
      hasError: true,
    });
  }
  render() {
    if (this.state.hasError) {
      return <div>An error occured getting weather for this day!</div>;
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};
