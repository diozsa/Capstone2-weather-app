import React from "react";
import Header from "../Components/Header";
import Stats from "../Components/Stats";
const HomePage = () => {

  return(
    <>
      <Header />
      <Stats />
      <p className="lead fs-5 d-flex justify-content-center my-3">Hourly Forecast</p>

      
    </>
  )
}

export default HomePage;