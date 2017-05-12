import React from 'react';
import {Container} from 'reactstrap';
import {Link} from "react-router";

class Home extends React.Component {

    render() {
        return (
            <Container>
            <div className="homepage">
                <h3>This is a homepage component</h3>
                <p>login as {this.props.role}</p>
                {(this.props.role == 'patient' || this.props.role == 'admin') && <Link to="doctors-list">Doctor list</Link>}
            </div>
            </Container>
        );
    }
}

export default Home;