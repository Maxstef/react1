import React from 'react';
import {Link} from "react-router";
import {browserHistory} from "react-router";
import {Button, Container, Row, Col} from 'reactstrap';

const id = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function DoctorsListFunc(props) {
  const doctorId = props.id;
  const doctorList = doctorId.map((id) =>
      <Row className="doctors-list">
        <Col xs="12">
          <li>
            <Link to={"/doctor/" + id} activeClassName="active">
              <Row>
                <Col>
                  Doctor #{id}
                </Col>
              </Row>
              <Row>
                <Col>
                  Description: speciality and other important things
                </Col>
              </Row>
            </Link>
          </li>
        </Col>
      </Row>
  );
  return (
      <div className="doctors-list">
        <ul>{doctorList}</ul>
      </div>
  );
}

class DoctorsList extends React.Component {
  
  toHome() {
    return browserHistory.push('/');
  }
  
  render() {
    return (
        <DoctorsListFunc id={id}/>
    )
  }
}

export default DoctorsList;