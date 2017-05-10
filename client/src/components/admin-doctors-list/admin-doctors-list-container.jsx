import React from 'react';
import {Link} from "react-router";
import {browserHistory} from "react-router";
import axios from 'axios';
import AdminDoctorsList from './admin-doctors-list';

class AdminDoctorsListContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        info: []
        };
    };
    
    componentDidMount() {
        axios.get('http://localhost:3000/doctors')
            .then(res => {
                let info = res.data;
                this.setState({info});
                console.log(info[0]);
                console.log(info);
            });
    }

    render() {
        return (
            <AdminDoctorsList info={this.state.info}></AdminDoctorsList>
        )
    }
}

export default AdminDoctorsListContainer;