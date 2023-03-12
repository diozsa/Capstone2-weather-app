import React, { useContext } from "react";
import UserContext from "../auth/UserContext";

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import icons from "../icons/icons";

const CurrentCard = ({time}) => {
  const { weatherData } = useContext(UserContext);
  const icon = weatherData.currentConditions.icon;

  return (
    <Card
      className="border-info border-2 shadow max-w-400 m-4 d-flex align-items-center justify-content-center bg-secondary bg-opacity-10"
      // style={{maxWidth: "350px"}}
    // style={{ width: '80%', maxWidth: '400px', margin: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Row>
        <Col xs={4} className="d-flex flex-column align-items-center justify-content-center"
        style ={{maxWidth:"60%"}}>
          <Card.Img variant="top" src={icons[icon]}
            style={{ margin: '0 auto', maxWidth: '80px' }} />
          <Card.Text style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '40px' }}>
            {Math.round(weatherData.currentConditions.temp) + "\xB0F"} 
          </Card.Text>
        </Col>
        <Col className="d-flex flex-column align-items-center justify-content-center" style={{ width: "60%" }}>

          <Card.Body style={{ textAlign: 'center'}}>
            <Card.Title className="fw-bold text-muted" style={{ fontSize: '24px' }}>
              Current stats
            </Card.Title>
            <Card.Text className="fs-5">
              {weatherData.currentConditions.conditions}
            </Card.Text>
            <Card.Text className="fs-5">
              Feels like {Math.round(weatherData.currentConditions.feelslike) + "\xB0F"}
            </Card.Text>
            <Card.Text className="text-muted fs-6" >
              (as of {time})
            </Card.Text>
          </Card.Body>
        </Col>
        {/* <Col>
          <ListGroup className="list-group-flush" style={{ textAlign: 'center' }}>
            <ListGroup.Item>Cras justo odio</ListGroup.Item>
            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
          </ListGroup>
        </Col> */}
      </Row>
    </Card>
  )

}

export default CurrentCard;