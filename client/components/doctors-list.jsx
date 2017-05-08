import React from 'react';
import {Link} from "react-router";
import {browserHistory} from "react-router";
import {Button, Container, Row, Col} from 'reactstrap';
import axios from 'axios';

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
  constructor(props) {
    super(props);
    this.state = {
      info: [],
      name: {},
      doctorType: {}
    };
  };
  
  componentDidMount() {
    axios.get('http://localhost:3000/doctors')
         .then(res => {
           let info = res.data;
           // let name = res.data[0].name;
           // let doctorType = res.data[0].doctorData.doctorType[0];
           this.setState({info});
         });
  }
  
  toHome() {
    return browserHistory.push('/');
  }
  
  render() {
    return (
        <DoctorsListFunc id={this.state.info}/>
    )
  }
}

export default DoctorsList;