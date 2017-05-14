import React from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, Row, Col} from 'reactstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';
// import 'react-datepicker/dist/react-datepicker.css';
import * as _ from 'lodash';

class AddMeeting extends React.Component {
  
  isDisabled(slot) {
    let flag = false;
    console.log('busy slots: ', this.props.busySlots, 'slot: ', slot);
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
            {/*<div className={"slots card " + (this.isDisabled(slot) ? 'card-warning' : 'card-outline-warning')}>*/}
              {/*<div className="slot card-block">*/}
                {/*{this.props.slotTimes[slot]}*/}
              {/*</div>*/}
            {/*</div>*/}
            <button type="button" className={"btn btn-sm " + (this.isDisabled(slot) ? 'btn-warning disabled' : 'btn-secondary')}>{this.props.slotTimes[slot]}</button>
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
                  minDate={moment()}
                  maxDate={moment().add(14, "days")}
                  onChange={this.props.dpChange}
              />
            </Col>
            <Col md={{size: 5, offset: 0}} xs={{size: 8, offset: 2}}>
              {this.renderSlots(this.props.currentSlots)}
            </Col>
          </Row>
          <Row>
            <Col md={{size: 10, offset: 1}} xs={{size: 10, offset: 1}}>
              <button type="button" className="btn btn-secondary" onClick={this.props.toggleMeeting}>Back</button>
              <button type="button" className="btn btn-warning" onClick={this.props.toggleMeeting}>Apply</button>
            </Col>
          </Row>
        </Container>
    )
  }
}

export default AddMeeting;