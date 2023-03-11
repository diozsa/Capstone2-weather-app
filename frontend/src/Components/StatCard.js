import React, {useContext} from "react";
import UserContext from "../auth/UserContext";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import icons from "../icons/icons";

const StatCard = ({ txt, val, icon }) => {
  const { weatherData } = useContext(UserContext);
  // const icon = weatherData.currentConditions.icon;


  return (
    <Card
      className="shadow border-info m-auto d-flex align-items-center justify-content-center"
      style={{ minWidth: "210px", maxWidth: '210px', minHeight: "80px", width: '70%' }}
      // style={{ width: '70%', minHeight: "80px", minWidth: "210px", maxWidth: '210px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Row>
        <Col xs={4} className="d-flex flex-column align-items-center justify-content-center"
          style={{ maxWidth: "60%" }}>
          <Card.Img variant="top" src={icons[icon]}
            style={{ margin: '0 auto', maxWidth: '80px' }} />
        </Col>

        <Col>
          <ListGroup className="list-group-flush" style={{ textAlign: 'center' }}>
            <ListGroup.Item className="fw-bold text-muted">{txt}</ListGroup.Item>
            <ListGroup.Item>{ val }</ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Card>

  )
} 
export default StatCard;