import React, { useContext } from "react";
import UserContext from "../auth/UserContext";
import Alert from "react-bootstrap/Alert"
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Header = () => {
  const { weatherData, search, address, unit, setUnit } = useContext(UserContext);
console.log(" Unit in top of Header: ", unit)
  if (!weatherData) {
    return <p className="lead fs-4 m-4">Location not found. Try another!</p>;
  }
  console.log("Unit in Header is: ", unit)

  return (
    <>
      <Row>
        <Col>
          <h1 className="display-6 ms-3 mt-4">{weatherData.resolvedAddress}</h1>
        </Col>
        <Col className="d-flex justify-content-end align-items-start">
          <button
            className="btn btn-outline-primary mt-5 me-2 fs-5 "
            onClick={() => {
              /* This version did not retrieve the correct state */

              // search(address, unit).then(() => {
              //   setUnit(unit === "us" ? "metric" : "us");
              // });

              const unitToUse = unit === "us" ? "metric" : "us"
              search(address, unitToUse)
                .then(() => {setUnit(unitToUse);});
            }}
          >            
            {"\xB0F"} / {"\xB0C"}
          </button>
        </Col>

      </Row>
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