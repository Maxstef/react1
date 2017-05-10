import React from 'react';
import {Container} from 'reactstrap';
import {Link} from "react-router";
import axios from 'axios';

class Home extends React.Component {

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
        <Container>
          <div className="homepage">
            <h3>This is a homepage component</h3>
              <p>login as {this.state.role}</p>
              {this.state.role == 'admin' && <Link to="admin-doctors-list">Doctor list</Link>}
              {this.state.role == 'patient' && <Link to="doctors-list">Doctor list</Link>}
          </div>
        </Container>
    );
  }
}

export default Home;