import React from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, Row, Col} from 'reactstrap';

class AddMeeting extends React.Component {
  
  render() {
    return (
        <Row>
          <Col>
            Add meeting component!
          </Col>
          <Button color="default" onClick={this.props.toggleMeeting}>Back</Button>
          <Button color="success" onClick={this.props.toggleMeeting}>Apply</Button>
        </Row>
    )
  }
}

export default AddMeeting;