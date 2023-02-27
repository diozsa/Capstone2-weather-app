import React, { useState } from 'react'
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from 'react-bootstrap/Button';

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
        <InputGroup className="mb-auto">
          <Form.Control
            placeholder="Search for a city, address or zip code"
            type="text"
            name="searchTerm"
            value={searchTerm}
            onChange={handleChange}
          />
          <Button type="submit" variant="outline-secondary" id="search-button">
            Search Location
          </Button>
        </InputGroup>
      </Form>
    // </div>
  );
}

export default SearchForm;