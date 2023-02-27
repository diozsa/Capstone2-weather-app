import React from "react";
import Spinner from "react-bootstrap/Spinner";
// import "./LoadingSpinner.css";

/** Loading message used by components that fetch API data. */

function LoadingSpinner() {
  return <Spinner animation="border" variant="info" />;
}

export default LoadingSpinner;