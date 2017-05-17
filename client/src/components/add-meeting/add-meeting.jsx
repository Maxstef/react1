import React from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, Row, Col} from 'reactstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';
// import 'react-datepicker/dist/react-datepicker.css';
import * as _ from 'lodash';

class AddMeeting extends React.Component {
  
  isDisabled(slot) {
    let flag = false;
    _.filter(this.props.busySlots, (busyOne) => {
      if (slot === busyOne) {
        flag = true;
        return flag;
      }
    });
    return flag;
  }
  
  renderSlots(array) {
    const Slot = ({slot}) => {
      return (
          <div>
            <button type="button"
                    disabled={this.isDisabled(slot)}
                    onClick={() => {this.props.addMeeting(slot)}}
                    className={"slots btn btn-sm " + (this.isDisabled(slot) ? 'btn-info' : 'btn-secondary')}>{this.props.slotTimes[slot]}
            </button>
          </div>
      );
    };
    return array.map((slot, index) => (
        <Slot key={index} slot={slot}/>
    ));
  };
  
  render() {
    return (
        <Container>
          <Row>
            <Col md={{size: 10, offset: 1}} xs={{size: 10, offset: 1}}>
              Add meeting component!
            </Col>
          </Row>
          <Row>
            <Col md={{size: 5, offset: 1}} xs={{size: 10, offset: 1}}>
              <DatePicker
                  inline
                  selected={this.props.startDate}
                  minDate={moment().add(1, "days")}
                  maxDate={moment().add(14, "days")}
                  onChange={this.props.dpChange}
                  locale="uk-en"
                  includeDates={this.props.openDates}
                  highlightDates={[moment()]}
              />
            </Col>
            <Col md={{size: 6, offset: 0}} xs={{size: 8, offset: 1}}>
              {this.props.currentSlots && this.renderSlots(this.props.currentSlots)}
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-center mt-2" md={{size: 10, offset: 1}} xs={{size: 10, offset: 1}}>
              <button type="button" className="btn btn-secondary mr-1" onClick={this.props.toggleMeeting}>Back</button>
              <button type="button" className="btn btn-warning" onClick={this.props.toggle}>Apply</button>
            </Col>
          </Row>
          
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
              <Button color="primary" onClick={() => {this.props.postMeeting(); this.props.toggle()}}>Do Something</Button>{' '}
              <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
            </ModalFooter>
          </Modal>
          
        </Container>
    )
  }
}

export default AddMeeting;