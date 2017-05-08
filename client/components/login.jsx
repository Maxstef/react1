import React from 'react';
import {Container, Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import {Link} from "react-router";
import Validation from 'react-validation';

class Login extends React.Component {

  handleSubmit(){
    console.log('submit');
  }

  render() {
    return (
        <Container>
          <div className="login">
            <h3>Login to clinic</h3>
            <Form>
              <FormGroup>
                <Label for="username">Username</Label>
                <Input type="text" name="username" id="username" placeholder="username" />
                <span className="fa fa fa-user-circle-o fa-lg input-icon"></span>
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input type="password" name="password" id="password" placeholder="password" />
                <span className="fa fa-unlock-alt fa-lg input-icon"></span>
              </FormGroup>
              <Link to="registration">register</Link>
              <Button className="submit-btn pull-right" color="primary">Login</Button>
            </Form>
          </div>
        </Container>
    );
  }
}

export default Login;