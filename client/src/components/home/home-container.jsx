import React from 'react';
import axios from 'axios';
import Home from './home';

class HomeContainer extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            role: ''
        };
    }

    componentDidMount() {
        var t = this;
        axios.get('http://localhost:3000/users/' + localStorage.getItem('id'))
            .then(res => {
                if(res.data.adminData){
                    t.setState({role: 'admin'});
                } else if(res.data.patientData){
                    t.setState({role: 'patient'});
                } else if(res.data.doctorData){
                    t.setState({role: 'doctor'});
                }
            });
    }

    render() {
        return (
            <Home role={this.state.role}></Home>
        );
    }
}

export default HomeContainer;