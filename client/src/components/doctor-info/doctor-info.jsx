import React from "react";
import {Button, Col, Container, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";

class DoctorInfo extends React.Component {
  
  renderDoctorTypes(doctorType) {
    const Type = ({type}) => {
      return (
          <div>
            <span>{'\n'}{type.name}{'.\n'}</span>
            <span>{type.description}</span>
          </div>
      )
    };
    return doctorType.map((type, index) => (
        <Type key={index} type={type}/>
    ));
  }
  
  render() {
    return (
        <div>
          <Row>
            <Col md={{size: 10, offset: 1}} xs={{size: 10, offset: 1}}>
              <button type="button" className="btn btn-link mr-1 mb-1" onClick={this.props.toDoctorList}>Back</button>
            </Col>
          </Row>
          <Row>
            <Col md={{size: 10, offset: 1}} xs={{size: 10, offset: 1}}>
              <header className="search-header">{this.props.info.username}{' '}#{this.props.doctorId}{' '}
                {this.props.name.first}{' '}{this.props.name.last}
              </header>
              <p>
                {this.renderDoctorTypes(this.props.doctorType)}
                <p>Current doctor {this.props.currentDoctor}</p>
                <p>{String(this.props.listEmpty)} list</p>
                <p>{this.props.info.doctorData.bio}</p>
              </p>
              { !this.props.meeting && <Button color="warning" onClick={this.props.toggleMeeting}>Make meeting</Button>}
            </Col>
          </Row>
        </div>
    );
  }
}

// DoctorInfo.propTypes = {
//   setYear: PropTypes.func.isRequired
// };

export default DoctorInfo;