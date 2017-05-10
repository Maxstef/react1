import React from 'react';
import {Link} from "react-router";
import {browserHistory} from "react-router";
import axios from 'axios';
import AdminDoctorsList from './admin-doctors-list';

class AdminDoctorsListContainer extends React.Component {

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
            <AdminDoctorsList></AdminDoctorsList>
        )
    }
}

export default AdminDoctorsListContainer;