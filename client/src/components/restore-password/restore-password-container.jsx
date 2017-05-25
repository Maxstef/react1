import React from 'react';
import { Link, browserHistory } from "react-router";
import axios from 'axios';
import config from 'react-global-configuration';
import RestorePassword from "./restore-password";

class RestorePasswordContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <RestorePassword />
        );
    }
}

export default RestorePasswordContainer;