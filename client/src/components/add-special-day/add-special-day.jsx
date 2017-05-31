import React from 'react';
import config from 'react-global-configuration';
import DatePicker from 'react-datepicker';
import moment from "moment";
import * as _ from 'lodash';
import { Tooltip, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';


class AddSpecialDay extends React.Component {

    dispalyDay(date) {
        return (
            <h3>{moment(date).format("DD MMMM YYYY")}</h3>
        )
    }

    renderSlots(array) {
        const Slot = ({slot}) => {
        return (
            <div>
                <button type="button" onClick={() => {this.props.selectSlot(slot)}}
                        className={"slots btn btn-sm " + (this.props.isSelected(slot) ? 'btn-info' : 'btn-secondary')}>{this.props.slotTimes[slot]}
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
            <div>
                {(this.props.user  && (!(typeof this.props.user.doctorData.specialDays == 'undefined'
                    || this.props.user.doctorData.specialDays === null)) && this.props.user.doctorData.specialDays.length > 0) && 
                    <span>you have saved special dates</span>
                }
                <button id="addSpecialDay" className="btn btn-primary pull-right" onClick={this.props.toggleModal}>
                    <i className="fa fa-plus-square" aria-hidden="true"></i>
                </button>
                <Tooltip placement="top" isOpen={this.props.tooltipAddSpecialOpen} target="addSpecialDay" toggle={this.props.toggleAddSpecialTooltip}>
                    Add overtime hours
                </Tooltip>
                <Modal className="modal-lg"
                        isOpen={this.props.modalOpen}
                        toggle={this.props.toggleModal}>
                    <ModalHeader toggle={this.props.toggleModal}>Add special (overtime) day</ModalHeader>
                    <ModalBody style={{minHeight: "500px"}}>
                        <DatePicker
                            inline
                            minDate={moment().add(1, "days")}
                            selected={this.props.selectedDate}
                            onChange={this.props.changeDate}/>
                        {this.props.selectedDate !== null && this.dispalyDay(this.props.selectedDate)}
                        {this.props.selectedDate === null && <h3>Choose the date</h3>}
                        {this.props.selectedDate !== null && this.renderSlots(this.props.availableSlots)}
                    </ModalBody>
                    <ModalFooter>
                    <Button color="secondary" onClick={this.props.toggleModal}>Cancel</Button>
                    <Button color="warning" onClick={() => {this.props.addSpecialDays(); this.props.toggleModal()}}>Apply</Button>{' '}
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default AddSpecialDay;