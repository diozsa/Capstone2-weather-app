import React, {useContext, useState, useEffect} from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Modal from "react-bootstrap/Modal"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import LoginForm from "../auth/LoginForm";
import LoginSignupForm from "../auth/LoginSignupForm";
import UserContext from "../auth/UserContext";
import SearchForm from "../common/SearchForm";

/** Navigation bar for site. Shows up on every page.
 *
 * When user is logged in, shows links to main areas of site. When not,
 * shows link to Login and Signup forms.
 *
 * Rendered by App.
 */

const NavBar = ({logout, login, signup, search}) => {
  const { currentUser } = useContext(UserContext);
  console.debug("Navigation", "currentUser=", currentUser);

  const [showModal, setShowModal] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);

  // set Modal to false after login
  useEffect(() => {
    if (currentUser) {
      setShowModal(false);
    }
  }, [currentUser]);

  // toggle Modal to show/hide
  const toggleModal = () => {
    setShowModal(!showModal);
    // setIsLoginMode(!isLoginMode); /////
  };

  // switch between Login and Signup
  const toggleLoginMode = () => {
    setIsLoginMode(!isLoginMode);
  }

  // Shows links for logged in user
  function loggedInNav() {
    return (
      <>
        
        <Nav.Link href="/">Saved Locations</Nav.Link>
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
        <Nav.Link onClick={toggleModal} eventKey="login"
          className="pr-5">Login / Signup</Nav.Link>

        <Modal show={showModal} onHide={toggleModal}>
          <Modal.Header closeButton>
            {/* <Modal.Title>Login</Modal.Title> */}
            <Modal.Title>
              {isLoginMode ? "Log In" : "Sign Up"}
            </Modal.Title>

          </Modal.Header>
          <Modal.Body>
            {/* <LoginForm login={login} /> */}
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
      variant="light" className="justify-content-between px-5">
      {/* <Container> */}
        {/* <div className="d-flex justify-content-between"> */}
          {/* <Col className="mr-auto"> */}

    <div className=" d-flex align-items-center">
        <Navbar.Brand className="d-none d-sm-block">Weather Forecast</Navbar.Brand>
        <SearchForm searchFor={search} />
            </div>

          {/* </Col>
          <Col > */}
            <Nav className="justify-content-end">
          {currentUser ? loggedInNav() : loggedOutNav()}
            </Nav>
          {/* </Col> */}
        {/* </div> */}
      {/* </Container> */}
    </Navbar>

  )
}

export default NavBar;