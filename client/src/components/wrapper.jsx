import React from 'react';
import {Container, Row, Col, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap';
import {Link} from "react-router";
import Logout from "./logout";

class Wrapper extends React.Component {
  render() {
    return (
        <div className="wrapper">
            <Navbar color="faded" className="navbar-inverse" toggleable>
              <NavbarToggler/>
              <NavbarBrand href="/">clinic</NavbarBrand>
              <Collapse isOpen={true} navbar>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <Link className="nav-link" to="/">Home</Link>
                  </NavItem>
                  <NavItem>
                    <Link className="nav-link" to="/doctors-list">Doctors list</Link>
                  </NavItem>
                  <NavItem>
                    <Logout/>
                  </NavItem>
                </Nav>
              </Collapse>
            </Navbar>
          
          <Container className="content">
            <main>
              {this.props.children}
            </main>
          </Container>
          <footer className="footer">
            <Container>
              <span>Place sticky footer content here.</span>
            </Container>
          </footer>
        </div>
    );
  }
}

export default Wrapper;