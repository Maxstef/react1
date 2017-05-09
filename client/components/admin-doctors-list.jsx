import React from 'react';
import {Link} from "react-router";
import {browserHistory} from "react-router";
import {Button, Container, Row, Col} from 'reactstrap';
import axios from 'axios';

class AdminDoctorsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            info: [],
            name: {},
            doctorType: {}
        };
    };


    render() {
        return (
            <h2>Admin doctors</h2>
        )
    }
}

export default AdminDoctorsList;