import React from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, Row, Col} from 'reactstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import * as _ from 'lodash';
import config from 'react-global-configuration';

class ShowAppointments extends React.Component {
  
  renderSlots(array) {
    const Slot = ({meeting}) => {
      return (
          <div>
            <button type="button"
                    onClick={() => {this.props.showPatientData(meeting)}}
                    className="slots btn btn-sm btn-secondary">
              {this.props.slotTimes[meeting.slot]}
            </button>
          </div>
      );
    };
    return array.map((meeting, index) => (
        <Slot key={index} meeting={meeting}/>
    ));
  };
  
  render() {
    return (
        <Container>
          <Row>
            <Col className="mb-4 mt-2" md={{size: 10, offset: 1}} xs={{size: 10, offset: 1}}>
              Choose day to view your appointments
            </Col>
          </Row>
          <Row>
            <Col className="mb-4" xs={{size: 10, offset: 1}} md={{size: 5, offset: 1}} lg={{size: 4, offset: 1}}>
              <DatePicker
                  inline
                  selected={this.props.startDate}
                  minDate={moment()}
                  // maxDate={moment().add(14, "days")}
                  onChange={this.props.dpChange}
                  // locale="uk-en"
                  includeDates={this.props.openDates}
                  highlightDates={[moment()]}
              />
            </Col>
            <Col className="mb-1" xs={{size: 8, offset: 1}} md={{size: 6, offset: 0}} lg={{size: 5, offset: 0}}>
              {this.props.currentSlots && this.renderSlots(this.props.todayMeetings)}
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-left mt-2" md={{size: 10, offset: 1}} xs={{size: 10, offset: 1}}>
              <button type="button" className="btn btn-secondary mr-1" onClick={this.props.toggleMeeting}>Cancel</button>
            </Col>
          </Row>
          <Modal className="modal-lg"
                 isOpen={this.props.modal}
                 toggle={this.props.toggle}>
            <ModalHeader toggle={this.props.toggle}>Appointment</ModalHeader>
            <ModalBody>
              {(this.props.meetingDetails && this.props.meetingDetails.patientNotRegister) && 
                <div>
                  <p>Date - {moment(this.props.meetingDetails.date).format('DD MMM YYYY, dddd') + ", " + config.get('slotTimes')[this.props.meetingDetails.slot]}</p>
                  <p>Patient - {this.props.meetingDetails.patientNotRegister.name.first + " " + this.props.meetingDetails.patientNotRegister.name.last}</p>
                  <p>Phone - {this.props.meetingDetails.patientNotRegister.phone}</p>
                </div>
            }
              {(this.props.meetingDetails && !this.props.meetingDetails.patientNotRegister) && 
                <div>
                  <p>Date - {moment(this.props.meetingDetails.date).format('DD MMM YYYY, dddd') + ", " + config.get('slotTimes')[this.props.meetingDetails.slot]}</p>
                  <p>Patient - {this.props.meetingDetails.patient.name.first + " " + this.props.meetingDetails.patient.name.last}</p>
                  <p>Phone - {this.props.meetingDetails.patient.patientData.contacts.phoneNumber}</p>
                </div>
            }
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.props.toggle}>Ok</Button>
            </ModalFooter>
          </Modal>
        
        </Container>
    )
  }
}

export default ShowAppointments;