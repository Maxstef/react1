import React from 'react';
import {Link, browserHistory} from "react-router";

class Logout extends React.Component {

    logout(){
        localStorage.removeItem('username');
        localStorage.removeItem('id');
        browserHistory.push('/');
    }

    render() {
        return (
            <a className="nav-link" onClick={this.logout.bind(this)} style={{cursor: 'pointer'}}>Logout</a>
        );
    }
}

export default Logout;