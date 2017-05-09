import React from 'react';
import {Container, Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import {Link, browserHistory} from "react-router";
import axios from 'axios';

class Login extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      usernameValid: false,
      passwordValid: false,
      loginError: false,
      loginErrorMessage: ''
    };
    this.checkUsername = this.checkUsername.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
  }

  componentWillMount(){
    if(localStorage.getItem('username') !== null && localStorage.getItem('id') !== null){
      browserHistory.push('/home');
    }
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
    var t = this;
    axios.post('http://localhost:3000/login', {
        username: e.target.username.value,
        password: e.target.password.value
    })
    .then(function (response) {
      if(typeof response.data.error == 'undefined'){
          browserHistory.push('/home');
          localStorage.setItem("username", response.data.username);
          localStorage.setItem("id", response.data._id);
      } else {
          t.setState({loginError: true, loginErrorMessage: response.data.error});
      }
    })
    .catch(function (error) {
        console.log(error);
    });
  }

  render() {
    return (
        <Container>
          <div className="login">
            <h3>Login to clinic</h3>
            <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
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
              <Link to="registration">registration</Link>
              <Button className="submit-btn pull-right" color="primary" disabled={!(this.state.usernameValid && this.state.passwordValid)}>Login</Button>
            </Form>
              {this.state.loginError &&
              <div className="alert alert-danger">
                  {this.state.loginErrorMessage}
              </div>
              }
          </div>
        </Container>
    );
  }
}

export default Login;