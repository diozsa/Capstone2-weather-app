import React, { useContext } from "react";
import UserContext from "../auth/UserContext";
import Alert from "react-bootstrap/Alert"

const Header = () => {
  const { weatherData } = useContext(UserContext);
  if (!weatherData) {
    return <p className="lead fs-4 m-4">Location not found. Try another!</p>;
  }

  return (
    <>
      <h1 className="display-6 m-3">{weatherData.resolvedAddress}</h1>
      <p className="lead fs-4 m-3">{weatherData.description}</p>
      {
        weatherData.alert.link
          ? <Alert variant="danger" className="ms-3">
            Weather Alert - {weatherData.alert.event}. &nbsp;&nbsp;
            <a href={weatherData.alert.link} target="_blank" rel="noopener noreferrer">
              More information here</a>
            </Alert>
          : null
      }
    </>
  )
}

export default Header;