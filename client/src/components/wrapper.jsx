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
                {(localStorage.getItem('role') === 'patient' || localStorage.getItem('role') === 'guest') && <NavItem>
                  <Link className="nav-link" to="/">Home</Link>
                </NavItem>}
                {(localStorage.getItem('role') === 'doctor') && <NavItem>
                  <Link className="nav-link" to="/cabinet">Cabinet</Link>
                </NavItem>}
                {(localStorage.getItem('role') === 'patient') && <NavItem>
                  <Link className="nav-link" to="/patient-cabinet">Cabinet</Link>
                </NavItem>}
                {(localStorage.getItem('role') === 'patient' || localStorage.getItem('role') === 'guest' || localStorage.getItem('role') === 'admin') && <NavItem>
                  <Link className="nav-link" to="/doctors-list">Doctors list</Link>
                </NavItem>}
                {localStorage.getItem('id') === null && <NavItem>
                  <Link className="nav-link" to="/login">Log in</Link>
                </NavItem>}
                {localStorage.getItem('id') !== null && <NavItem>
                  <Logout/>
                </NavItem>}
              </Nav>
            </Collapse>
          </Navbar>
          
          <div className="content">
            <main>
              {this.props.children}
            </main>
          </div>
          <footer className="footer">
            <Container>
              <span>033-248-325-22</span>
            </Container>
          </footer>
        </div>
    );
  }
}

export default Wrapper;