import React, {useContext} from "react";
import CurrentCard from "./CurrentCard";
import UserContext from "../auth/UserContext";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import StatCard from "./StatCard";

const Stats = () => {
  function formatDateTime(weatherData, datetime) {
    const currTimeString = weatherData.currentConditions[datetime];
    const currDateString = weatherData.days[0][datetime];
    const time = new Date(`${currDateString} ${currTimeString}`);
    const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    const formattedDate = time.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    let res = [formattedTime, formattedDate];
    return res;
  }

  const { weatherData } = useContext(UserContext);
  // const currTimeString = weatherData.currentConditions.datetime;
  // const currDateString = weatherData.days[0].datetime;
  // const time = new Date(`${currDateString} ${currTimeString}`);
  // const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  // const formattedDate = time.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const currTime = formatDateTime(weatherData, "datetime")[0];
  const sunrise = formatDateTime(weatherData, "sunrise")[0];
  const sunset = formatDateTime(weatherData, "sunset")[0];
  return (
    <>
      <Row >
        <Col sm={10} lg={6} xl={4}>
          <CurrentCard time={currTime} />
        </Col>
        <Col className="overflow-auto">
          
          <Row className="flex-nowrap">
            <StatCard
              txt="MinTemp"
              val={Math.round(weatherData.days[0].tempmin) + "\xB0F"}
            />
            <StatCard
              txt="Sunrise"
              val={sunrise}
            />
              <StatCard />
              <StatCard />
            </Row>

          <Row className="flex-nowrap" style={{ marginTop: "10px" }}>
            <StatCard
              txt="MaxTemp"
              val={Math.round(weatherData.days[0].tempmax) + "\xB0F"}
            />
              <StatCard />
              <StatCard />
              <StatCard />
            </Row>
        </Col>
      </Row>
    </>
    
  )
}

export default Stats;