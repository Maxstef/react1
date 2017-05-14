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
              <hr/>
              <p>Current doctor {this.props.currentDoctor}</p>
              <p>{String(this.props.listEmpty)} list</p>
            </p>
            { !this.props.meeting && <Button color="warning" onClick={this.props.toggleMeeting}>Make meeting</Button>}
          </Col>
          
          <Modal isOpen={this.props.modal}
                 toggle={this.props.toggle}
                 className="modal-lg"
                 backdrop={this.props.backdrop}>
            <ModalHeader toggle={this.props.toggle}>Modal title</ModalHeader>
            <ModalBody>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
              ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
              deserunt mollit anim id est laborum.
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.props.toggle}>Do Something</Button>{' '}
              <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
            </ModalFooter>
          </Modal>
        
        </div>
    );
  }
}

// DoctorInfo.propTypes = {
//   setYear: PropTypes.func.isRequired
// };

export default DoctorInfo;