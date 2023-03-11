import React, {useContext} from "react";
import CurrentCard from "./CurrentCard";
import UserContext from "../auth/UserContext";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import StatCard from "./StatCard";

const Stats = () => {

  function formatDateTime(weatherData, datetime) {
    // currentConditions[datetime] is a string like "21:43:30"
    const currTimeString = weatherData.currentConditions[datetime];
    // days[0].datetime is a string like "2023-03-08";
    const currDateString = weatherData.days[0].datetime;
    const time = new Date(`${currDateString} ${currTimeString}`);
    const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    const formattedDate = time.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    let res = [formattedTime, formattedDate];
    return res;
  }

  function uvIndex(uvindex) {
    switch (true) {
      case (uvindex >= 0 && uvindex <= 2):
       return "low";
      case (uvindex >= 3 && uvindex <= 5):
        return "mod";
      case (uvindex >= 6 && uvindex <= 8):
        return "high";
      case (uvindex > 9):
        return "extreme";
      default:
        break;
    }
  }

  const { weatherData } = useContext(UserContext);
  const uvindex = weatherData.currentConditions.uvindex;
  let index = uvIndex(uvindex);

  const currTime = formatDateTime(weatherData, "datetime")[0];
  const sunrise = formatDateTime(weatherData, "sunrise")[0];
  const sunset = formatDateTime(weatherData, "sunset")[0];
  return (
    <>
      <Row >
        <Col sm={10} lg={6} xl={4}>
          <CurrentCard time={currTime} />
        </Col>
        <Col className="overflow-auto" style={{ marginTop: "30px" }}>
          
          <Row className="flex-nowrap">
            <StatCard
              txt="MinTemp"
              val={Math.round(weatherData.days[0].tempmin) + "\xB0F"}
              icon="min-temp"
            />
            <StatCard
              txt="Sunrise"
              val={sunrise}
              icon="sunrise"
            />
            <StatCard
              txt="Wind"
              val={Math.round(weatherData.currentConditions.windspeed) + " mph"}
              icon="wind"
            />
            <StatCard            
              txt="UV index"
              val={Math.round(weatherData.currentConditions.uvindex) + ` (${index})`}
              icon="uv"
            />
            </Row>

          <Row className="flex-nowrap" style={{ marginTop: "10px" }}>
            <StatCard
              txt="MaxTemp"
              val={Math.round(weatherData.days[0].tempmax) + "\xB0F"}
              icon="max-temp"
            />
            <StatCard
              txt="Sunset"
              val={sunset}
              icon="sunset"
            />
            <StatCard
              txt="Visibility"
              val={weatherData.currentConditions.visibility + " mi"}
              icon="visibility"
            />
            <StatCard
              txt="Humidity"
              val={Math.round(weatherData.currentConditions.humidity) + "%"}
              icon="humidity"
            />
            </Row>
        </Col>
      </Row>
    </>
    
  )
}

export default Stats;