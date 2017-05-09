import React from 'react';
import {Container, Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import {Link} from "react-router";
import Validation from 'react-validation';

class Login extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      usernameValid: false,
      passwordValid: false
    };
    this.checkUsername = this.checkUsername.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
  }

  checkUsername(e){
    if(e.target.value.trim().length > 0){
      this.setState({usernameValid: true});
    } else {
      this.setState({usernameValid: false});
    }
  }

  checkPassword(e){
    if(e.target.value.trim().length > 0){
      this.setState({passwordValid: true});
    } else {
      this.setState({passwordValid: false});
    }
  }

  handleSubmit(e){
    e.preventDefault();
    console.log('submit');
  }

  render() {
    return (
        <Container>
          <div className="login">
            <h3>Login to clinic</h3>
            <Form onSubmit={this.handleSubmit.bind(this)}>
              <FormGroup>
                <Label for="username">Username</Label>
                <Input type="text" name="username" id="username" placeholder="username" onChange={this.checkUsername} />
                <span className="fa fa fa-user-circle-o fa-lg input-icon"></span>
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input type="password" name="password" id="password" placeholder="password" onChange={this.checkPassword} />
                <span className="fa fa-unlock-alt fa-lg input-icon"></span>
              </FormGroup>
              <Link to="registration">register</Link>
              <Button className="submit-btn pull-right" color="primary" disabled={!(this.state.usernameValid && this.state.passwordValid)}>Login</Button>
            </Form>
          </div>
        </Container>
    );
  }
}

export default Login;