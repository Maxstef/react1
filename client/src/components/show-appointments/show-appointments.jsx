import React from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, Row, Col} from 'reactstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import * as _ from 'lodash';

class ShowAppointments extends React.Component {
  
  renderSlots(array) {
    const Slot = ({slot}) => {
      return (
          <div>
            <button type="button"
                    onClick={() => {this.props.addMeeting(slot)}}
                    className="slots btn btn-sm btn-secondary">
              {this.props.slotTimes[slot]}
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
              {this.props.currentSlots && this.renderSlots(this.props.currentSlots)}
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-left mt-2" md={{size: 10, offset: 1}} xs={{size: 10, offset: 1}}>
              <button type="button" className="btn btn-secondary mr-1" onClick={this.props.toggleMeeting}>Cancel</button>
            </Col>
          </Row>
        
        </Container>
    )
  }
}

export default ShowAppointments;