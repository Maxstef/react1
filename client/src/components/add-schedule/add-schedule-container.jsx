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
                    timeValue: [{start: ' ', end: ' '}]
                },
                {
                    day: 'mo',
                    available: false,
                    slots: [],
                    timeValue: [{start: ' ', end: ' '}]
                },
                {
                    day: 'tu',
                    available: false,
                    slots: [],
                    timeValue: [{start: ' ', end: ' '}]
                },
                {
                    day: 'we',
                    available: false,
                    slots: [],
                    timeValue: [{start: ' ', end: ' '}]
                },
                {
                    day: 'th',
                    available: false,
                    slots: [],
                    timeValue: [{start: ' ', end: ' '}]
                },
                {
                    day: 'fr',
                    available: false,
                    slots: [],
                    timeValue: [{start: ' ', end: ' '}]
                },
                {
                    day: 'sa',
                    available: false,
                    slots: [],
                    timeValue: [{start: ' ', end: ' '}]
                }
            ],
            focus: {day: -1, range: -1, key: ''}
        };
        this.changeDay = this.changeDay.bind(this);
        this.newRange = this.newRange.bind(this);
        this.removeRange = this.removeRange.bind(this);
        this.changeTimeValue = this.changeTimeValue.bind(this);
        this.setFocus = this.setFocus.bind(this);
    }

    changeDay(index){
        let d = this.state.days;
        d[index].available = !d[index].available;
        this.setState({days: d });
    }

    newRange(index){
        let d = this.state.days;
        d[index].timeValue.push({start: ' ', end: ' '});
        this.setState({days: d });
    }

    removeRange(index){
        let d = this.state.days;
        d[index].timeValue.pop();
        this.setState({days: d });
    }

    changeTimeValue(day, index, key, value){
        let d = this.state.days;
        d[day].timeValue[index][key] = value;
        this.setState({days: d });
    }

    setFocus(day, range, key){
        console.log('here');
        let d = {
            day: day,
            range: range,
            key: key
        };
        this.setState({focus: d });
        console.log(this.state.focus);
    }

    render() {
        return (           
            <AddSchedule slotTimes={this.state.slotTimes}
                         days={this.state.days}
                         changeDay={this.changeDay}
                         newRange={this.newRange}
                         removeRange={this.removeRange}
                         changeTimeValue={this.changeTimeValue}
                         focus={this.state.focus}
                         setFocus={this.setFocus} />   
        );
    }
}

export default AddScheduleContainer;