import React, {useContext, useState, useEffect} from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Modal from "react-bootstrap/Modal"
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

const NavBar = ({logout, login, signup}) => {
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

  const toggleModal = () => {
    setShowModal(!showModal);
    // setIsLoginMode(!isLoginMode); /////
  };

  // switches between Login and Signup
  const toggleLoginMode = () => {
    setIsLoginMode(!isLoginMode);
  }

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
      <div className="d-flex align-items-center">
        <Navbar.Brand>Weather Forecast</Navbar.Brand>
        <SearchForm />
      </div>
        <Nav >
          {currentUser ? loggedInNav() : loggedOutNav()}
        </Nav>

    </Navbar>

  )
}

export default NavBar;