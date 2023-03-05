import React, { useState } from 'react'
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
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
      <InputGroup>
        <Form.Control
          style={{ width: "400px" }}
          placeholder="Search for a city, address or zip code"
          type="text"
          name="searchTerm"
          value={searchTerm}
          onChange={handleChange}
          required
        />
        <Button
          type="submit"
          variant="outline-secondary"
          id="search-button"
          style={{ marginRight: "10px" }}
        >
          Search
        </Button>
      </InputGroup>
      {/* </Col> */}

    </Form>
      {
    formErrors.length
    ? <Message type="danger" messages={formErrors} />
    : null
  }
    </>
    // </div>
  );
}

export default SearchForm;