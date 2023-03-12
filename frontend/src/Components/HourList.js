import React, { useContext } from "react";
import UserContext from "../auth/UserContext";
import HourCard from "./HourCard";
import Row from "react-bootstrap/Row";

const HourList = ({ formatDateTime }) => {

  const { weatherData } = useContext(UserContext);
  const dateString = weatherData.days[0].datetime;
  // const time = formatDateTime(weatherData.days[0].hours[0].datetime, dateString)[0];


  return (
    // <HourCard
    //   icon={weatherData.days[0].hours[0].icon}
    //   temp={Math.round(weatherData.days[0].hours[0].temp) + "\xB0F"}
    //   hour={time}
    // />

    <>
      <Row className="flex-nowrap overflow-auto py-4">
      {weatherData.days[0].hours.map(hour => {
        const time = formatDateTime(hour.datetime, dateString)[0];

        return (
          <HourCard
            key={hour.datetime} // add a unique key prop
            icon={hour.icon}
            temp={Math.round(hour.temp) + "\xB0F"}
            hour={time}
          />
        );
      })}
      </Row>
    </>
  )
}

export default HourList;