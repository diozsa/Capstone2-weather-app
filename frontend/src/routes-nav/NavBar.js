import React, {useContext, useState, useEffect} from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from 'react-bootstrap/NavDropdown';
import Modal from "react-bootstrap/Modal"
import LoginSignupForm from "../auth/LoginSignupForm";
import UserContext from "../auth/UserContext";
import SearchForm from "../common/SearchForm";
import saveIcon from '../icons/pin.png';
import loginIcon from '../icons/login.png';
import logoutIcon from '../icons/logout.png';


/** Navigation bar for site. Shows up on every page.
 *
 * When user is logged in, shows links to main areas of site. When not,
 * shows link to Login and Signup forms.
 *
 * Rendered by App.
 */

const NavBar = ({logout, login, signup, search, saveAdd, getAdds}) => {
  const { currentUser, address, weatherData } = useContext(UserContext);
  console.debug("Navigation", "currentUser=", currentUser);

  const [showModal, setShowModal] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [locations, setLocations] = useState([]);
  const [loginClicked, setLoginClicked] = useState(false);
  const [savedLocation, setSavedLocation] = useState(false);

// gets all saved locations for logged in user
  useEffect(() => {
    async function fetchLocations() {
      const res = await getAdds(currentUser);
      if (res.success) {
        console.log("*********** addresses", res)
        setLocations(res.addresses);
      }
    }
    fetchLocations();
  }, [currentUser, savedLocation]);

// used for enabling the Save location button after a new search
  useEffect(() => {
    setSavedLocation(false);
  }, [weatherData]);


  // set Modal to false after login
  useEffect(() => {
    if (currentUser) {
      setShowModal(false);
    }
  }, [currentUser]);

  // toggles Modal to show/hide Login/Sinaup Form
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  // switch between Login and Signup
  const toggleLoginMode = () => {
    setIsLoginMode(!isLoginMode);
  }
  
  function loggedInNav() {
    // Limit locations fixed list to first 5
    // remaining locatoins in the list will be scrolled in window
    const locationsToShow = locations.slice(0, 5);

    return (
      <>
        <Nav.Link className="ps-4 text-muted" eventKey="disabled">
          Welcome, {currentUser}
        </Nav.Link>

        <NavDropdown className="ps-4" id="nav-dropdown" title="Locations">
          {locations.length === 0 && '-- no locations yet --'}
          {locationsToShow.map((location) => (
            <NavDropdown.Item
              key={location.id}
              onClick={() => search(location.address)}>
              {location.address}
            </NavDropdown.Item>
          ))}

          <NavDropdown.Divider />
          <NavDropdown.Divider />
          
          {locations.length > 5 && (
            <div
              style={{
                maxHeight: "150px",
                overflowY: "auto",
                marginTop: "10px",
                maxWidth: "320px",
                overflowX:  "auto"
              }}
            >
              {locations.slice(5).map((location) => (
                <NavDropdown.Item
                  key={location.id}
                  onClick={() => search(location.address)}>
                  {location.address}
                </NavDropdown.Item>
              ))}
            </div>
          )}

        </NavDropdown>
        {weatherData && (<Nav.Link
          className="ps-4"
          onClick={() => saveAdd(
            { username: currentUser, address: address },
            setSavedLocation(true))}
          disabled={savedLocation}
        >
          <img src={saveIcon} style={{ width: "25px" }} alt="Save Icon" />
          Save
        </Nav.Link>
        )}

        <Nav.Link className="ps-4" onClick={() => {
          logout();
          setLoginClicked(false);
        }} >
          <img src={logoutIcon} style={{ width: "25px" }} alt="Logout Icon" />
          Log Out
        </Nav.Link>
      </>
    );
  }


  // Shows links for logged out user
  function loggedOutNav() {
    return (
      <>
        {/* * redirecting to login for non-logged in
        *     and sending alert to the user */}

        <Nav.Link className="ps-4" onClick={() => {
          toggleModal();
          setLoginClicked(true);
        }} >

          <img src={saveIcon} style={{ width: "30px" }} alt="Save Icon" />
          Save
        </Nav.Link>

        <Nav.Link onClick={toggleModal} eventKey="login"
          className="ps-4">
          <img src={loginIcon} style={{ width: "25px" }} alt="Login Icon" />
          &nbsp;Login / Signup
        </Nav.Link>

        <Modal show={showModal} onHide={toggleModal} >
          <Modal.Header closeButton>
            <Modal.Title>
              {isLoginMode ? "Log In" : "Sign Up"}
            </Modal.Title>

          </Modal.Header>
          <Modal.Body>
            {loginClicked && <p className="text-danger">Must log in first</p>}

            <LoginSignupForm
              login={login}
              signup={signup}
              isLoginMode={isLoginMode}
              toggleModal={toggleModal}
              toggleLoginMode={toggleLoginMode}
            />
          </Modal.Body>
        </Modal>
      </>
    );
  }

  return (
    <Navbar style={{ backgroundColor: 'lightBlue', height: '70px' }}
      variant="light" className="justify-content-between px-5" expand="lg">

      <div className=" d-flex align-items-center">
        <Navbar.Brand className="d-none d-md-block">Weather Forecast</Navbar.Brand>
        <SearchForm searchFor={search} />
      </div>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />

      <Navbar.Collapse
        style={{ zIndex: "1", backgroundColor: 'lightBlue' }}
        id="responsive-navbar-nav"
        className="justify-content-end rounded">

      <Nav className="justify-content-end">
        {currentUser ? loggedInNav() : loggedOutNav()}
      </Nav>
        
      </Navbar.Collapse>

    </Navbar>
  )
}

export default NavBar;