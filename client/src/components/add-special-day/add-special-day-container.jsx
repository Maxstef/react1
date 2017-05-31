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
            tooltipAddSpecialOpen: false,
            modalOpen: false,
            selectedDate: null,
            availableSlots: [],
            slotTimes: config.get('slotTimes'),
            selectedSlots: []
        };
        this.toggleAddSpecialTooltip = this.toggleAddSpecialTooltip.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.addSpecialDays = this.addSpecialDays.bind(this);
        this.changeDate = this.changeDate.bind(this);
        this.setSlots = this.setSlots.bind(this);
        this.selectSlot = this.selectSlot.bind(this);
        this.isSelected = this.isSelected.bind(this);
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
                console.log(day.slot);
                _.remove(available, (slot) => {
                    return _.includes(day.slot, slot);
                });
                this.setState({availableSlots: available});
                console.log(this.state.availableSlots);
            }
        })
    }

    changeDate(date){
        this.setState({
            selectedDate: date,
            selectedSlots: []
        });
        this.setSlots(moment(date).weekday());
        console.log("cange date");
        console.log(this.state.selectedDate);
    }

    addSpecialDays() {
        console.log(this.state.selectedSlots);
        axios.put(config.get('api') + 'doctors/' + this.props.user._id, {specialDays: [{date: this.state.selectedDate, slot: this.state.selectedSlots}]})
            .then(res => {
                if(res.data.error){
                    console.log(res.data.message);
                } else {
                    let user = res.data;
                    this.props.setInfo(user); 
                }
            });
    }

    toggleModal() {
        this.setState({
            modalOpen: !this.state.modalOpen
        });
    }

    toggleAddSpecialTooltip() {
        this.setState({
            tooltipAddSpecialOpen: !this.state.tooltipAddSpecialOpen
        });
    }

    render() {
        return (
            <AddSpecialDay 
                tooltipAddSpecialOpen={this.state.tooltipAddSpecialOpen}
                toggleAddSpecialTooltip={this.toggleAddSpecialTooltip}
                toggleModal={this.toggleModal}
                modalOpen={this.state.modalOpen}
                addSpecialDays={this.addSpecialDays}
                changeDate={this.changeDate}
                selectedDate={this.state.selectedDate}
                user={this.props.user}
                slotTimes={this.state.slotTimes}
                availableSlots={this.state.availableSlots}
                selectSlot={this.selectSlot}
                isSelected={this.isSelected}/>
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