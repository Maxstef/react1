import React from 'react';
import { Link, browserHistory } from "react-router";
import axios from 'axios';
import config from 'react-global-configuration';
import RestorePassword from "./restore-password";

class RestorePasswordContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            response: null,
            token: location.search.substring(7)
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        axios.post(config.get("api") + "restore-password?restorePassword=" + true, {password: e.target.password.value, token: this.state.token})
            .then((res) => {
                this.setState({response: res.data});
            })
    }

    render() {
        return (
            <RestorePassword
                handleSubmit={this.handleSubmit}
                response={this.state.response}/>
        );
    }
}

export default RestorePasswordContainer;