import React from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, Row, Col} from 'reactstrap';
import axios from 'axios';


class DoctorInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      backdrop: "static",
      info: {},
      name: {},
      doctorType: {}
    };
    this.toggle = this.toggle.bind(this);
  };
  
  componentDidMount() {
    axios.get('http://localhost:3000/doctors')
         .then(res => {
           let info = res.data[0];
           let name = res.data[0].name;
           let doctorType = res.data[0].doctorData.doctorType[0];
           this.setState({info, name, doctorType});
         });
  }
  
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
    console.log(this.state.info._id, this.state.name, this.state.description);
  }
  
  render() {
    return (
        <div>
          <Col md={{size: 8, offset: 2}} xs={{size: 10, offset: 1}}>
            <header className="search-header">{this.state.info.username}{' '}#{this.props.params.doctorId}{' '}
            {this.state.name.first}{' '}{this.state.name.last},{' '}{this.state.doctorType.name}
            </header>
            <p>
              {this.state.doctorType.description}{"\n"}
              {this.state.info._id}
            </p>
            <Button color="warning" onClick={this.toggle}>Make meeting</Button>
          </Col>
          
          <Modal isOpen={this.state.modal} toggle={this.toggle} className="modal-lg" backdrop={this.state.backdrop}>
            <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
            <ModalBody>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
              ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
              deserunt mollit anim id est laborum.
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
              <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </Modal>
        
        </div>
    );
  }
}

export default DoctorInfo;