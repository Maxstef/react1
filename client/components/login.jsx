import React from 'react';
import {Container} from 'reactstrap';
import {Link} from "react-router";

class Login extends React.Component {
  render() {
    return (
        <Container>
          <div className="login">
            <h3>This is a login</h3>
            <Link to="registration">register</Link>
          </div>
        </Container>
    );
  }
}

export default Login;