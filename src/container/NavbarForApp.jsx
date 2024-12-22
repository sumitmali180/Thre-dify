import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';
import '../styles/NavbarForApp.css';

function NavbarForApp({ loggedIn }) {
  return (
    <Navbar expand="lg" className="navbar-custom fixed-top">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="brand-animated">
          <img src="https://i.ibb.co/r4QkQZ3/image.png" alt="threadify" style={{ width: '40%' }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto ms-auto my-2 my-lg-0 navbar-links">
            <Nav.Link as={Link} to="/" className="custom-nav-link">Home</Nav.Link>
            <Nav.Link as={Link} to="/category" className="custom-nav-link">Category</Nav.Link>
            <Nav.Link as={Link} to="/thread" className="custom-nav-link">Thread</Nav.Link>
            <Nav.Link as={Link} to="/contactus" className="custom-nav-link">Contact Us</Nav.Link>
            {loggedIn ? (
              <Nav.Link as={Link} to="/profile" className="custom-nav-link">
                <img src="https://i.ibb.co/ccbQ0gK/image.png" alt="Profile" className="profile-pic" />
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/loginSignUp" className="custom-nav-link">Login/SignUp</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarForApp;
