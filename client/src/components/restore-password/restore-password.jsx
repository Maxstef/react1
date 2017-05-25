import React from 'react';
import { Link, browserHistory } from "react-router";
import axios from 'axios';
import config from 'react-global-configuration';
import {Container} from "reactstrap";

class RestorePassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <Container>
                restore pass
            </Container>
        );
    }
}

export default RestorePassword;