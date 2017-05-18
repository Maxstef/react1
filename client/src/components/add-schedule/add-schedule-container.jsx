import React from 'react';
import AddSchedule from './add-schedule';
import config from 'react-global-configuration';
import * as _ from 'lodash';


class AddScheduleContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            slotTimes: config.get('slotTimes'),
            days: [
                {
                    day: 'su',
                    available: false,
                    slots: [],
                    slotValue: [{from: -1, to: -1}]
                },
                {
                    day: 'mo',
                    available: false,
                    slots: [],
                    slotValue: [{from: -1, to: -1}]
                },
                {
                    day: 'tu',
                    available: false,
                    slots: [],
                    slotValue: [{from: -1, to: -1}]
                },
                {
                    day: 'we',
                    available: false,
                    slots: [],
                    slotValue: [{from: -1, to: -1}]
                },
                {
                    day: 'th',
                    available: false,
                    slots: [],
                    slotValue: [{from: -1, to: -1}]
                },
                {
                    day: 'fr',
                    available: false,
                    slots: [],
                    slotValue: [{from: -1, to: -1}]
                },
                {
                    day: 'sa',
                    available: false,
                    slots: [],
                    slotValue: [{from: -1, to: -1}]
                }
            ],
            //focus: {day: -1, range: -1, key: ''}
        };
        this.changeDay = this.changeDay.bind(this);
        this.newRange = this.newRange.bind(this);
        this.removeRange = this.removeRange.bind(this);
        this.changeSlotValue = this.changeSlotValue.bind(this);
        this.invalidForm = this.invalidForm.bind(this);
        //this.setFocus = this.setFocus.bind(this);
    }

    changeDay(index){
        let d = this.state.days;
        d[index].available = !d[index].available;
        this.setState({days: d });
    }

    newRange(index){
        let d = this.state.days;
        d[index].slotValue.push({from: -1, to: -1});
        this.setState({days: d });
    }

    removeRange(index){
        let d = this.state.days;
        d[index].slotValue.pop();
        this.setState({days: d });
    }

    changeSlotValue(day, index, key, value){
        console.log(day, index, key, value);
        let d = this.state.days;
        d[day].slotValue[index][key] = value;
        this.setState({days: d });
        console.log(this.state.days);
    }

    invalidForm(){
        let invalid = true;
        _.forEach(this.state.days, (day)=>{
            if(day.available){
                invalid = false;
                _.forEach(day.slotValue, (slot)=>{
                    if(slot.from == -1 || slot.to == -1){
                        invalid = true;
                    }
                });
            }
        });
        return invalid;
    }

    /*setFocus(day, range, key){
        console.log('here');
        let d = {
            day: day,
            range: range,
            key: key
        };
        this.setState({focus: d });
        console.log(this.state.focus);
    }*/

    render() {
        return (           
            <AddSchedule slotTimes={this.state.slotTimes}
                         days={this.state.days}
                         changeDay={this.changeDay}
                         newRange={this.newRange}
                         removeRange={this.removeRange}
                         changeSlotValue={this.changeSlotValue}
                         focus={this.state.focus}
                         setFocus={this.setFocus}
                         invalidForm={this.invalidForm} />   
        );
    }
}

export default AddScheduleContainer;