import React from 'react';
import {Link} from "react-router";
import {browserHistory} from "react-router";
import {Button, Container, Row, Col} from 'reactstrap';
import axios from 'axios';

function renderDoctors(info) {
  if (info.length > 0) {
    return info.map((doctor, index) => (
        <Doctor key={index} doctor={doctor}/>
    ));
  }
  else return [];
}

function renderDoctorTypes(doctor) {
  const dType = doctor.doctorData.doctorType;
  return dType.map((type, index) => (
      <Type key={index} type={type}/>
  ));
}

const Type = ({type}) => {
  return (
      <div>
        <span>{'\n'}{type.name}{'.\n'}</span>
        <span>{type.description}</span>
      </div>
  )
};

const Doctor = ({doctor}) => {
  const doctorTypes = renderDoctorTypes(doctor);
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
                  {doctorTypes}
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