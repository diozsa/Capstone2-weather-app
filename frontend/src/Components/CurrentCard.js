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
    <Card border="info" style={{ width: '70%', maxWidth: '400px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
            <Card.Title>Currently</Card.Title>
            <Card.Text style={{ fontSize: '20px' }}>
              {weatherData.currentConditions.conditions}
            </Card.Text>
            <Card.Text style={{fontSize:'20px'}}>
              Feels like {Math.round(weatherData.currentConditions.feelslike) + "\xB0F"}
            </Card.Text>
            <Card.Text style={{ fontSize: '15px' }}>
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