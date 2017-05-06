import React from 'react';
import {Container, Row, Col, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap';
import {Link} from "react-router";

class Wrapper extends React.Component {
  render() {
    return (
        <div className="wrapper">
            <Navbar color="faded" toggleable>
              <NavbarToggler/>
              <NavbarBrand href="/">clinic</NavbarBrand>
              <Collapse isOpen={true} navbar>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <NavLink><Link to="/">Home</Link></NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink><Link to="/doctors-list">List</Link></NavLink>
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
              <span className="text-muted">Place sticky footer content here.</span>
            </Container>
          </footer>
        </div>
    );
  }
}

export default Wrapper;