import React from 'react';
import config from 'react-global-configuration';
import DatePicker from 'react-datepicker';
import moment from "moment";
import * as _ from 'lodash';
import { Tooltip, Modal, ModalHeader, ModalBody, ModalFooter, Button, Alert } from 'reactstrap';


class AddSpecialDay extends React.Component {

    dispalyDay(date) {
        return (
            <h3>{moment(date).format("DD MMMM YYYY")}</h3>
        )
    }

    renderSlots(array) {
        const Slot = ({slot}) => {
            return (
                <div className="col-6 col-md-4 col-lg-3">
                    <button type="button" onClick={() => {this.props.selectSlot(slot)}}
                            className={"slots-small btn btn-sm " + (this.props.isSelected(slot) ? 'btn-info' : 'btn-secondary')}>{this.props.slotTimes[slot]}
                    </button>
                </div>
            );
        };
        return array.map((slot, index) => (
            <Slot key={index} slot={slot}/>
        ));
    };

    renderOvertimeData(days){
        let renderHours = (slots) => {
            const Hours = ({slot}) => {
                return <span>{this.props.slotTimes[slot]}, </span>;
            };
            return slots.map((slot, index) => (
                <Hours key={index} slot={slot}/>
            ));
        }
        const SpecialDay = ({day}) => {
            return (
                <tr>
                    <td>{moment(day.date).format("DD MMMM YYYY")}</td>
                    <td>{renderHours(day.slot)}</td>
                    <td>
                        <button className="btn btn-danger" onClick={()=>{this.props.deleteSpecialDay(day); this.props.toggleInfoModal()}}>
                            <i className="fa fa-trash" aria-hidden="true"></i>
                        </button>
                    </td>
                </tr>
            );
        };
        return days.map((day, index) => (
            <SpecialDay key={index} day={day}/>
        ));
    }

    render() {
        return (
            <div>
                {(this.props.user  && (!(typeof this.props.user.doctorData.specialDays == 'undefined'
                    || this.props.user.doctorData.specialDays === null)) && this.props.user.doctorData.specialDays.length > 0) && 
                    <span>You have saved special (overtime) days saved</span>
                }
                <button id="addSpecialDay" className="btn btn-primary pull-right" onClick={this.props.toggleAddModal} style={{marginLeft: "5px"}}>
                    <i className="fa fa-plus-square" aria-hidden="true"></i>
                </button>
                <Tooltip placement="top" isOpen={this.props.tooltipAddSpecialOpen} target="addSpecialDay" toggle={this.props.toggleAddSpecialTooltip}>
                    Add overtime hours
                </Tooltip>
                {(this.props.user  && (!(typeof this.props.user.doctorData.specialDays == 'undefined'
                    || this.props.user.doctorData.specialDays === null)) && this.props.user.doctorData.specialDays.length > 0) &&
                    <div style={{display: "inline"}}>
                        <button id="specialDayInfo" className="btn btn-primary pull-right" onClick={this.props.toggleInfoModal}>
                            <i className="fa fa-info-circle" aria-hidden="true"></i>
                        </button>
                        <Tooltip placement="bottom" isOpen={this.props.tooltipSpecialDaysInfo} target="specialDayInfo" toggle={this.props.toggleSpecialDaysInfoTooltip}>
                            Added overtime hours info
                        </Tooltip>
                        <Modal className="modal-lg"
                                isOpen={this.props.infoModalOpen}
                                toggle={this.props.toggleInfoModal}>
                            <ModalHeader toggle={this.props.toggleInfoModal}>Overtime hours info</ModalHeader>
                            <ModalBody>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <td>Date</td>
                                            <td>Hours</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderOvertimeData(this.props.user.doctorData.specialDays)}
                                    </tbody>
                                </table>
                            </ModalBody>
                            <ModalFooter>
                            <Button color="secondary" onClick={this.props.toggleInfoModal}>OK</Button>
                            </ModalFooter>
                        </Modal>
                    </div>
                }
                <Modal className="modal-lg"
                        isOpen={this.props.addModalOpen}
                        toggle={this.props.toggleAddModal}>
                    <ModalHeader toggle={this.props.toggleAddModal}>Add special (overtime) day</ModalHeader>
                    <ModalBody style={{minHeight: "500px"}}>
                        <div className="row">
                            <div className="col-md-7">
                                <DatePicker
                                inline
                                minDate={moment().add(1, "days")}
                                selected={this.props.selectedDate}
                                onChange={this.props.changeDate}/>
                            </div>
                            <div className="col-md-5">
                                {this.props.selectedDate !== null && this.dispalyDay(this.props.selectedDate)}
                                {this.props.selectedDate === null && <h3>Choose the date</h3>}
                            </div>
                        </div>
                        <div className="row">
                            {this.props.selectedDate !== null && this.renderSlots(this.props.availableSlots)}
                        </div>
                    </ModalBody>
                    <ModalFooter>
                    <Button color="secondary" onClick={() => {this.props.toggleAddModal(); this.props.clearSpecial()}}>Cancel</Button>
                    <Button color="warning" onClick={() => {this.props.addSpecialDays(); this.props.toggleAddModal(); this.props.clearSpecial()}}>Apply</Button>{' '}
                    </ModalFooter>
                </Modal>

                {this.props.error !== null && 
                    <Alert onClick={this.props.hideMessage} className="toastr" color={(this.props.error)?"danger":"success"}>
                        {this.props.message}
                    </Alert>
                }
            </div>
        );
    }
}

export default AddSpecialDay;