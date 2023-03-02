import React, { useState } from 'react'
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from 'react-bootstrap/Button';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    searchFor(searchTerm);
    setsearchTerm(searchTerm);
  }

  const handleChange = (e) => {
    setsearchTerm(e.target.value);
  }

  return (
    // <div className='mt-5 col-md-5 mx-auto'>
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
          <Button type="submit" variant="outline-secondary" id="search-button">
            Search
          </Button>
          </InputGroup>
        {/* </Col> */}
      </Form>
    // </div>
  );
}

export default SearchForm;