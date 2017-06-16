import React from 'react';
import {Button, Input, Label, Modal, ModalHeader, ModalBody, ModalFooter, Container, Row, Col, Alert} from 'reactstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import * as _ from 'lodash';
import InputMask from 'react-input-mask';

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
            <Col className="mb-4 mt-2" md={{size: 10, offset: 1}} xs={{size: 10, offset: 1}}>
              To make an appointment, please choose available date and time.
            </Col>
          </Row>
          <Row>
            <Col className="mb-4" xs={{size: 10, offset: 1}} md={{size: 5, offset: 1}} lg={{size: 4, offset: 1}}>
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
            <Col className="mb-1" xs={{size: 8, offset: 1}} md={{size: 6, offset: 0}} lg={{size: 5, offset: 0}}>
              {this.props.currentSlots && this.renderSlots(this.props.currentSlots)}
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-left mt-2" md={{size: 10, offset: 1}} xs={{size: 10, offset: 1}}>
              <button type="button" className="btn btn-secondary mr-1" onClick={this.props.toggleMeeting}>Cancel</button>
            </Col>
          </Row>
          
          { (!this.props.isAlreadyAppointed && this.props.logedIn) &&
          <Modal className="modal-lg"
                 isOpen={this.props.modal}
                 toggle={this.props.toggle}
                 backdrop={this.props.backdrop}>
            <ModalHeader toggle={this.props.toggle}>Appointment</ModalHeader>
            <ModalBody>
              Are you really want to make appointment to {this.props.doctorsName.first}{' '}{this.props.doctorsName.last}{' '}{this.props.day} at {this.props.slotTimes[this.props.meetingSlot]}
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
              <Button color="warning" onClick={() => {this.props.postMeeting(); this.props.toggle()}}>Apply</Button>{' '}
            </ModalFooter>
          </Modal> }

          { (!this.props.isAlreadyAppointed && !this.props.logedIn) &&
          <Modal className="modal-lg"
                 isOpen={this.props.modal}
                 toggle={this.props.toggle}
                 backdrop={this.props.backdrop}>
            <ModalHeader toggle={this.props.toggle}>Appointment</ModalHeader>
            <ModalBody>
              <h4>Enter your name and phone for administration can contact you</h4>
              <Label for='phone'>Phone:</Label>
              <InputMask mask="+8 (999) 999-99-99" id='phone' className='form-control' onChange={(e) => {this.props.setUnlogedUserData('phone', e.target.value)}} />        
              <Label for='fname'>First name:</Label>
              <Input id='fname' onChange={(e) => {this.props.setUnlogedUserData('firstName', e.target.value)}} />
              <Label for='lname'>Last name:</Label>
              <Input id='lname' onChange={(e) => {this.props.setUnlogedUserData('lastName', e.target.value)}} />
              <br/>
              Are you really want to make appointment to {this.props.doctorsName.first}{' '}{this.props.doctorsName.last}{' '}{this.props.day} at {this.props.slotTimes[this.props.meetingSlot]}
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
              <Button color="warning" disabled={!this.props.unlogedUserData.valid} onClick={() => {this.props.postMeeting(); this.props.toggle()}}>Apply</Button>{' '}
            </ModalFooter>
          </Modal> }
  
          { this.props.isAlreadyAppointed && this.props.myCurrentMeeting &&
          <Modal className="modal-lg"
                 isOpen={this.props.modal}
                 toggle={this.props.toggle}
                 backdrop={this.props.backdrop}>
            <ModalHeader toggle={this.props.toggle}>Appointment</ModalHeader>
            { this.props.myCurrentMeeting && <ModalBody>
              You already appointed to {this.props.doctorsName.first}{' '}{this.props.doctorsName.last} at {this.props.myCurrentMeeting}. If you want to cancel this appointment, please connect to our reception via telephone.
            </ModalBody> }
            <ModalFooter>
              <Button color="secondary" onClick={this.props.toggle}>Understand</Button>
            </ModalFooter>
          </Modal> }

          {this.props.error !== null && 
                    <Alert onClick={this.props.hideMessage} className="toastr" color={(this.props.error)?"danger":"success"}>
                        {this.props.message}
                    </Alert>
                }
          
        </Container>
    )
  }
}

export default AddMeeting;