import React from 'react';
import { Link, browserHistory } from "react-router";
import axios from 'axios';
import Login from './login';
import config from 'react-global-configuration';

class LoginContainer extends React.Component {

  constructor(props) {
    super(props);
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

  componentWillMount() {
    if (localStorage.getItem('username') !== null && localStorage.getItem('id') !== null) {
      browserHistory.push('/home');
    }
  }

  checkUsername(e) {
    if (e.target.value.trim().length > 0) {
      this.setState({ usernameValid: true });
    } else {
      this.setState({ usernameValid: false });
    }
  }

  checkPassword(e) {
    if (e.target.value.trim().length > 0) {
      this.setState({ passwordValid: true });
    } else {
      this.setState({ passwordValid: false });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    var t = this;
    axios.post(config.get('api') + 'login', {
      username: e.target.username.value,
      password: e.target.password.value
    })
      .then(function (response) {
        if (typeof response.data.error == 'undefined') {
          localStorage.setItem("username", response.data.username);
          localStorage.setItem("id", response.data._id);
          browserHistory.push('/home');
        } else {
          t.setState({ loginError: true, loginErrorMessage: response.data.error });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <Login handleSubmit={this.handleSubmit}
        checkPassword={this.checkPassword}
        checkUsername={this.checkUsername}
        usernameValid={this.state.usernameValid}
        passwordValid={this.state.passwordValid}
        loginError={this.state.loginError}
        loginErrorMessage={this.state.loginErrorMessage}>
      </Login>
    );
  }
}

export default LoginContainer;