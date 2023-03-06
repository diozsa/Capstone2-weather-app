import React, { useContext } from "react";
import UserContext from "../auth/UserContext";
const Header = () => {
  const { weatherData } = useContext(UserContext);
  if (!weatherData) {
    return <p className="lead">Location not found. Try another!</p>;
  }
  return (
    <>
      <h1 className="display-6">{weatherData.resolvedAddress}</h1>
      <p className="lead">{weatherData.description}</p>
    </>
  )
}

export default Header;