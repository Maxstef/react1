import React from 'react';
import {Link} from "react-router";
import {browserHistory} from "react-router";
import { Button } from 'reactstrap';

class DoctorsList extends React.Component {
  render() {
    return (
        <div>
          <ul className="user-list">
            <li>
              <Link to="/doctor/1" activeClassName="active">
                Doctor 1
              </Link>
            </li>
            <li>
              <Link to="/doctor/2" activeClassName="active">
                Doctor 2
              </Link>
            </li>
            <li>
              <Link to="/doctor/3" activeClassName="active">
                Doctor 3
              </Link>
            </li>
          </ul>
          <Button color="primary" onClick={this.toHome.bind(this)}>primary</Button>{' '}
        </div>
    );
  };
  
  toHome() {
    return browserHistory.push('/');
  }
}

export default DoctorsList;