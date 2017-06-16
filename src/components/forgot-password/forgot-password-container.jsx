import React from 'react';
import { Link, browserHistory } from "react-router";
import axios from 'axios';
import config from 'react-global-configuration';
import ForgotPassword from "./forgot-password";

class ForgotPasswordContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            response: null
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        axios.post(config.get("api") + "restore-password", {email: e.target.email.value})
            .then((res) => {
                this.setState({response: res.data});
            })
    }

    render() {
        return (
            <ForgotPassword
                handleSubmit={this.handleSubmit}
                response={this.state.response} />
        );
    }
}

export default ForgotPasswordContainer;