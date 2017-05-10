import React from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, Row, Col} from 'reactstrap';

class DoctorInfo extends React.Component {
  
  render() {
    return (
        <div>
          <Col md={{size: 8, offset: 2}} xs={{size: 10, offset: 1}}>
            <header className="search-header">{this.props.info.username}{' '}#{this.props.doctorId}{' '}
            {this.props.name.first}{' '}{this.props.name.last},{' '}{this.props.doctorType.name}
            </header>
            <p>
              {this.props.doctorType.description}{"\n"}
              {this.props.info._id}
            </p>
            <Button color="warning" onClick={this.props.toggle}>Make meeting</Button>
          </Col>
          
          <Modal isOpen={this.props.modal} toggle={this.props.toggle} className="modal-lg" backdrop={this.props.backdrop}>
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

export default DoctorInfo;