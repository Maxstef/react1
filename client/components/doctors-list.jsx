import React from 'react';
import {Link} from "react-router";
import {browserHistory} from "react-router";
import {Button, Container, Row, Col} from 'reactstrap';
import axios from 'axios';

function DoctorsListFunc(props) {
  const doctorId = props.info;
  const doctorList = doctorId.map((doctor) =>
      <Row className="doctors-list">
        <Col xs="12">
          <li>
            <Link to={"/doctor/" + doctor} activeClassName="active">
              <Row>
                <Col>
                  Doctor #{doctor}
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

function renderDoctors(info) {
  if (info.length > 0) {
    return info.map((doctor, index) => (
        <Doctor key={index} doctor={doctor}/>
    ));
  }
  else return [];
}

const Doctor = ({doctor}) => {
  return (
        <Row className="doctors-list">
          <Col xs="12">
            <doctor key={doctor._id}>
              <Link to={"/doctor/" + doctor._id} activeClassName="active">
                <Row>
                  <Col>
                    Doctor{' '}{doctor.name.first}{' '}{doctor.name.last}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <p>
                      <span>{doctor.doctorData.doctorType[0].name}</span>
                      <span>{doctor.doctorData.doctorType[0].description}</span>
                    </p>
                    <p>{doctor._id}</p>
                  </Col>
                </Row>
              </Link>
            </doctor>
          </Col>
        </Row>
  );
};

class DoctorsList extends React.Component {
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
           // let name = res.data[0].name;
           // let doctorType = res.data[0].doctorData.doctorType[0];
           this.setState({info});
           console.log(info[0]);
         });
  }
  
  render() {
    const articles = renderDoctors(this.state.info);
    return (
        <section>
          {articles}
        </section>
    )
  }
}

export default DoctorsList;