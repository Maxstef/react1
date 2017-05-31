import React from 'react';
import { Link, browserHistory } from "react-router";
import axios from 'axios';
import config from 'react-global-configuration';
import {Container} from "reactstrap";
import Validation from 'react-validation';

class RestorePassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <Container>
                <h2 className="forgot-pass-title">Reset Password</h2>
                <Validation.components.Form onSubmit={this.props.handleSubmit} className="reset-pass-form">
                    <div className="form-group">
                        <label htmlFor="password">New Password</label>
                        <Validation.components.Input className="form-control" value=""
                            type="password" name="password" id="password" placeholder="New password"
                            errorClassName='is-invalid-input' validations={['required', 'minThree']} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="passwordConfirm">Confirm Password</label>
                        <Validation.components.Input className="form-control" value=""
                            type="password" name="passwordConfirm" id="passwordConfirm" placeholder="Confirm password"
                            errorClassName='is-invalid-input' validations={['required', 'password', 'minThree']} />
                    </div>
                    <Validation.components.Button className="submit-btn btn btn-primary"
                        disabled={this.props.response !== null && !this.props.response.error}>
                        Update Password
                    </Validation.components.Button>
                </Validation.components.Form>
                {this.props.response !== null &&
                    <div className={(this.props.response.error)?"alert alert-danger":"alert alert-info"}>
                    {this.props.response.message}
                    </div>
                }
                {(this.props.response !== null && !this.props.response.error) &&
                    <Link  to="login">login page</Link>
                }
                
            </Container>
        );
    }
}

export default RestorePassword;