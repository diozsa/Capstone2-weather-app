import React, { useContext } from "react";
import UserContext from "../auth/UserContext";
import DayCard from "./DayCard";
import Row from "react-bootstrap/Row";

const DayList = ({ formatDateTime }) => {

  const { weatherData } = useContext(UserContext);
  const timeString = weatherData.days[0].hours[0].datetime;

  return (
    <>
      <Row className="flex-nowrap overflow-auto py-4">
        {weatherData.days.map(day => {
          const date = formatDateTime(timeString, day.datetime)[1];

          return (
            <DayCard
              key={day.datetime} 
              icon={day.icon}
              conditions={day.conditions}
              tempMax={Math.round(day.tempmax) + "\xB0F"}
              tempMin={Math.round(day.tempmin) + "\xB0F"}
              precip={day.precipprob}
              date={date}
            />
          );
        })}
      </Row>
    </>
  )
}

export default DayList;