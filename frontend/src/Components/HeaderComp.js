import React, { useContext } from "react";
import UserContext from "../auth/UserContext";
const HeaderComp = () => {
  const { weatherData } = useContext(UserContext);
  if (!weatherData) {
    return <p>Location not found</p>;
  }
  return (
    <>
      <h1 className="display-6">{weatherData.resolvedAddress}</h1>
      <p className="lead">{weatherData.description}</p>
    </>
  )
}

export default HeaderComp;