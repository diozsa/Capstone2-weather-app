import React, { useState } from 'react'
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormGroup from "react-bootstrap/FormGroup";

import Button from 'react-bootstrap/Button';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Message from "./Message";


/** Search widget.
 *
 * Appears in Navbar for searching a location.
 *
 * This component doesn't *do* the searching, but it renders the search
 * form and calls the `searchFor` function prop that runs in a parent to do the
 * searching.
 *
 * { NavBar } -> SearchForm
 */

const SearchForm = ({ searchFor}) => {
  console.debug("SearchForm", "searchFor=", typeof searchFor);

  const [searchTerm, setsearchTerm] = useState('');
  const [formErrors, setFormErrors] = useState([]);


  // const handleSubmit = (e) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    // searchFor(searchTerm);
    let result = await searchFor(searchTerm);
    if (result.success) {
      setFormErrors([]);
      setsearchTerm(searchTerm);
    }      
    else {
      setFormErrors(["Location not found"]);
      setsearchTerm("");
    }
  }

  const handleChange = (e) => {
    setsearchTerm(e.target.value);
  }

  return (
    // <div className="d-flex flex-grow-1 justify-content-center align-items-center">
    <>
    <Form onSubmit={handleSubmit}>
        {/* <Col md={6} lg={12}> */}
        <Form.Group className="d-flex align-items-center">
        <Form.Control
          // style={{ width: "400px" }}
          placeholder="Search for a city, address or zip code"
          type="text"
          name="searchTerm"
          value={searchTerm}
          onChange={handleChange}
            required
            style={{ minWidth: "290px", width: "100%" }}
            className="form-control-md"
        />
        <Button
          type="submit"
          variant="outline-secondary"
          id="search-button"
        >
          Search
          </Button>
        </Form.Group>
        {/* </Col> */}
    </Form>

      {/* 
  /** error - not found alert     
      {
    formErrors.length
    ? <Message type="danger" messages={formErrors} />
    : null
  } */}
  
    </>
    // </div>
  );
}

export default SearchForm;