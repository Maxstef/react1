import React, {PropTypes, Component} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, Row, Col} from 'reactstrap';

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
          <Col md={{size: 10, offset: 1}} xs={{size: 10, offset: 1}}>
            <header className="search-header">{this.props.info.username}{' '}#{this.props.doctorId}{' '}
              {this.props.name.first}{' '}{this.props.name.last}
            </header>
            <p>
              {this.renderDoctorTypes(this.props.doctorType)}
              <p>Current doctor {this.props.currentDoctor}</p>
              <p>{String(this.props.listEmpty)} list</p>
            </p>
            { !this.props.meeting && <Button color="warning" onClick={this.props.toggleMeeting}>Make meeting</Button>}
          </Col>
        </div>
    );
  }
}

// DoctorInfo.propTypes = {
//   setYear: PropTypes.func.isRequired
// };

export default DoctorInfo;