import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from 'react-bootstrap/ListGroup';
import icons from "../icons/icons";

const DayCard = ({ icon, conditions, tempMax, tempMin, precip, date }) => {
  return (
    <>
      <Card
        className="me-2 shadow-lg border-0 m-auto d-flex align-items-center justify-content-center"
        style={{ maxWidth: '200px' }}
      >
        <Card.Img variant="top" src={icons[icon]}
          style={{ maxWidth: '70px' }}
        />
        <Card.Body>
          {/* <Card.Title>{conditions}</Card.Title> */}
          {/* <Card.Text className="d-flex justify-content-center">{conditions}</Card.Text> */}

          <Card.Text className="fs-4 text-danger d-flex justify-content-center">{tempMax}</Card.Text>
          <Card.Text className="fs-4 text-primary d-flex justify-content-center">{tempMin}</Card.Text>

      </Card.Body>
        <ListGroup className="list-group-flush d-flex align-items-center justify-content-center">
          <ListGroup.Item className="fs-5">{precip}%</ListGroup.Item>
          <ListGroup.Item>{date}</ListGroup.Item>
        </ListGroup>
      </Card>
    </>
  )
}

export default DayCard;