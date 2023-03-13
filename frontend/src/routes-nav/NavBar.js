import React, {useContext, useState, useEffect} from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Modal from "react-bootstrap/Modal"
import LoginSignupForm from "../auth/LoginSignupForm";
import UserContext from "../auth/UserContext";
import SearchForm from "../common/SearchForm";
import saveIcon from '../icons/pin.png';

/** Navigation bar for site. Shows up on every page.
 *
 * When user is logged in, shows links to main areas of site. When not,
 * shows link to Login and Signup forms.
 *
 * Rendered by App.
 */

const NavBar = ({logout, login, signup, search, saveAdd}) => {
  const { currentUser, address } = useContext(UserContext);
  console.debug("Navigation", "currentUser=", currentUser);

  const [showModal, setShowModal] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);


  const [navModal, setNavModal] = useState(false);
  const toggleNavModal = () => {
    setNavModal(!navModal);
  };



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

  // Shows links for logged in user
  function loggedInNav() {
    return (
      <>
        
        <Nav.Link onClick={() => saveAdd({ username: currentUser, address: address })}>
          <img src={saveIcon} alt="Save Icon" className=" w-50" />
        </Nav.Link>
        <Nav.Link onClick={logout}>Log Out</Nav.Link>
        <Nav.Link eventKey="disabled">
          Welcome, {currentUser}
        </Nav.Link>
      </>
    );
  }

  // Shows links for logged out user
  function loggedOutNav() {
    return (
      <>
        {/* redirecting to login for non-logged in */}
        <Nav.Link onClick={toggleModal}>
          <img src={saveIcon} alt="Save Icon" className=" w-50" />
        </Nav.Link>

        <Nav.Link onClick={toggleModal} eventKey="login"
          className="pr-5">Login / Signup</Nav.Link>

        <Modal show={showModal} onHide={toggleModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              {isLoginMode ? "Log In" : "Sign Up"}
            </Modal.Title>

          </Modal.Header>
          <Modal.Body>
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
      variant="light" className="justify-content-between px-5" expand="sm">

      <div className=" d-flex align-items-center">
        <Navbar.Brand className="d-none d-sm-block">Weather Forecast</Navbar.Brand>
        <SearchForm searchFor={search} />
      </div>
      
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />

      <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">

      <Nav className="justify-content-end">
        {currentUser ? loggedInNav() : loggedOutNav()}
      </Nav>
        
        
        <Modal show={navModal} onHide={toggleNavModal}>
          <Modal.Header closeButton>
            <Modal.Title>Menu</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Nav className="flex-column">
              {currentUser ? loggedInNav() : loggedOutNav()}
            </Nav>
          </Modal.Body>
        </Modal>
      </Navbar.Collapse>

    </Navbar>

  )
}

export default NavBar;