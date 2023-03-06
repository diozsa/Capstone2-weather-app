import React, { useContext } from "react";
import UserContext from "../auth/UserContext";

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import icons from "../icons/icons";

const CurrentCard = () => {
  const { weatherData } = useContext(UserContext);
  const icon = weatherData.currentConditions.icon;
  return (
    <Card style={{ width: 'auto' }}>
      <Row>
        <Col>
          <Card.Img variant="top" src={icons[icon]} />
          <Card.Text>
            {weatherData.currentConditions.temp}
          </Card.Text>
        </Col>
        <Col>
          <Card.Body>
            <Card.Title>Current conditions</Card.Title>
            <Card.Text>
              {weatherData.currentConditions.conditions}
            </Card.Text>
          </Card.Body>
        </Col>
        <Col>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>Cras justo odio</ListGroup.Item>
            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Card>
  )

}

export default CurrentCard;