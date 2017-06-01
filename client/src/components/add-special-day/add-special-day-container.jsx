import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as activeUserActions from '../../actions/active-user-action';
import axios from 'axios';
import config from 'react-global-configuration';
import AddSpecialDay from "./add-special-day";
import moment from "moment";
import * as _ from "lodash";

class AddSpecialDayContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            message: '',
            error: null,
            tooltipAddSpecialOpen: false,
            tooltipSpecialDaysInfo: false,
            addModalOpen: false,
            infoModalOpen: false,
            selectedDate: null,
            availableSlots: [],
            slotTimes: config.get('slotTimes'),
            selectedSlots: []
        };
        this.toggleAddSpecialTooltip = this.toggleAddSpecialTooltip.bind(this);
        this.toggleAddModal = this.toggleAddModal.bind(this);
        this.toggleInfoModal = this.toggleInfoModal.bind(this);
        this.addSpecialDays = this.addSpecialDays.bind(this);
        this.changeDate = this.changeDate.bind(this);
        this.setSlots = this.setSlots.bind(this);
        this.selectSlot = this.selectSlot.bind(this);
        this.isSelected = this.isSelected.bind(this);
        this.toggleSpecialDaysInfoTooltip = this.toggleSpecialDaysInfoTooltip.bind(this);
        this.clearSpecial = this.clearSpecial.bind(this);
        this.hideMessage = this.hideMessage.bind(this);
        this.deleteSpecialDay = this.deleteSpecialDay.bind(this);
    }

    isSelected(slot){
        return _.includes(this.state.selectedSlots, slot);
    }

    selectSlot(slot){
        let slots = this.state.selectedSlots;
        if(_.includes(slots, slot)){
            _.remove(slots, (s) => {
                return s == slot;
            });
        } else {
            slots.push(slot);
        }
        this.setState({selectedSlots: slots});
    }

    setSlots(dayOfWeek){
        let available = [];
        _.times(48, (index) => {
            available.push(index);
        });
        this.setState({availableSlots: available});
        _.forEach(this.props.user.doctorData.available, (day) => {
            if(day.day == dayOfWeek){
                _.remove(available, (slot) => {
                    return _.includes(day.slot, slot);
                });
                this.setState({availableSlots: available});
            }
        })
    }

    changeDate(date){
        this.setState({
            selectedDate: date,
            selectedSlots: []
        });
        this.setSlots(moment(date).weekday());
    }

    clearSpecial(){
        this.setState({
            selectedDate: null,
            selectedSlots: []
        });
    }

    addSpecialDays() {
        axios.put(config.get('api') + 'doctors/' + this.props.user._id, {specialDays: [{date: this.state.selectedDate, slot: this.state.selectedSlots}]})
            .then(res => {
                if(res.data.error){
                    this.setState({error: true, message: res.data.message});
                    console.log(res.data.message);
                } else {
                    this.setState({error: false, message: 'Success! Overtime hours have been saved'})
                    let user = res.data;
                    this.props.setInfo(user); 
                }
            });
    }

    toggleAddModal() {
        this.setState({
            addModalOpen: !this.state.addModalOpen
        });
    }

    toggleInfoModal() {
        this.setState({
            infoModalOpen: !this.state.infoModalOpen
        });
    }

    toggleSpecialDaysInfoTooltip() {
        this.setState({
            tooltipSpecialDaysInfo: !this.state.tooltipSpecialDaysInfo
        });
    }

    toggleAddSpecialTooltip() {
        this.setState({
            tooltipAddSpecialOpen: !this.state.tooltipAddSpecialOpen
        });
    }

    hideMessage(){
        this.setState({error: null});
        this.setState({message: ''});
    }

    deleteSpecialDay(day){
        console.log(day);
        axios.put(config.get('api') + 'doctors/' + this.props.user._id + '?removeSpecial=true', {specialDays: [day]})
            .then(res => {
                if(res.data.error){
                    this.setState({error: true, message: res.data.message});
                } else {
                    this.setState({error: false, message: 'Success! Overtime hours have been removed. Check your calendar! If someone already appoint meeting on this date you should contact to prevent them'});
                    let user = res.data;
                    this.props.setInfo(user);
                }
            });
    }

    render() {
        return (
            <AddSpecialDay 
                tooltipAddSpecialOpen={this.state.tooltipAddSpecialOpen}
                toggleAddSpecialTooltip={this.toggleAddSpecialTooltip}
                toggleAddModal={this.toggleAddModal}
                toggleInfoModal={this.toggleInfoModal}
                addSpecialDays={this.addSpecialDays}
                changeDate={this.changeDate}
                selectedDate={this.state.selectedDate}
                user={this.props.user}
                slotTimes={this.state.slotTimes}
                availableSlots={this.state.availableSlots}
                selectSlot={this.selectSlot}
                isSelected={this.isSelected}
                toggleSpecialDaysInfoTooltip={this.toggleSpecialDaysInfoTooltip}
                tooltipSpecialDaysInfo={this.state.tooltipSpecialDaysInfo}
                infoModalOpen={this.state.infoModalOpen}
                addModalOpen={this.state.addModalOpen}
                error={this.state.error}
                message={this.state.message}
                clearSpecial={this.clearSpecial}
                hideMessage={this.hideMessage}
                deleteSpecialDay={this.deleteSpecialDay}/>
        );
    }
}

function mapStateToProps(state) {
    return {
        role: state.activeUser.role,
        user: state.activeUser.info
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setInfo: bindActionCreators(activeUserActions.setUserInfo, dispatch),
        setRole: bindActionCreators(activeUserActions.setRole, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddSpecialDayContainer);