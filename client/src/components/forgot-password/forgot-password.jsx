import React from 'react';
import { Link, browserHistory } from "react-router";
import axios from 'axios';
import config from 'react-global-configuration';
import {Container} from "reactstrap";

class ForgotPassword extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      
    };
    
  }

  render() {
    return (
      <Container>
          <h2 className="forgot-pass-title">Forgot Password</h2>
          <form onSubmit={this.props.handleSubmit} className="reset-pass-form">
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input type="email" name="email" className="form-control" id="email" placeholder="Enter email"/>
            </div>
            <button type="submit" className="btn btn-primary" disabled={this.props.response !== null && !this.props.response.error}>Reset Password</button>
          </form>
          {this.props.response !== null &&
            <div className={(this.props.response.error)?"alert alert-danger":"alert alert-info"}>
              {this.props.response.message}
            </div>
          }
      </Container>
    );
  }
}

export default ForgotPassword;