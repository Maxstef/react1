import React from 'react';
import { Link } from "react-router";
import { Button, Container, Row, Col } from 'reactstrap';

function renderDoctors(info) {
  if (info.length > 0) {
    return info.map((doctor, index) => (
      <Doctor key={index} doctor={doctor} />
    ));
  } else return [];
}

const Doctor = ({doctor}) => {
  if (doctor) {
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
  }
};

function renderDoctorTypes(doctor) {
  if (doctor) {
    const dType = doctor.doctorData.doctorType;
    return dType.map((type, index) => (
      <Type key={index} type={type} />
    ));
  }
}

const Type = ({type}) => {
  return (
    <div>
      <span>{'\n'}{type.name}{'.\n'}</span>
      <span>{type.description}</span>
    </div>
  )
};


class DoctorsList extends React.Component {

  render() {
    const doctors = renderDoctors(this.props.info);
    return (
      <section>
        {doctors}
      </section>
    )
  }
}

export default DoctorsList;