import React from 'react';
import AddSchedule from './add-schedule';
import config from 'react-global-configuration';


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
                    ranges: 1
                },
                {
                    day: 'mo',
                    available: false,
                    slots: [],
                    ranges: 1
                },
                {
                    day: 'tu',
                    available: false,
                    slots: [],
                    ranges: 1
                },
                {
                    day: 'we',
                    available: false,
                    slots: [],
                    ranges: 1
                },
                {
                    day: 'th',
                    available: false,
                    slots: [],
                    ranges: 1
                },
                {
                    day: 'fr',
                    available: false,
                    slots: [],
                    ranges: 1
                },
                {
                    day: 'sa',
                    available: false,
                    slots: [],
                    ranges: 1
                }
            ]
        };
        this.changeDay = this.changeDay.bind(this);
    }

    changeDay(index){
        console.log(index);
        console.log(this.state.days);
        let d = this.state.days;
        d[index].available = !d[index].available;
        this.setState({days: d });
        console.log(this.state.days);
    }

    render() {
        return (           
            <AddSchedule slotTimes={this.state.slotTimes}
                         days={this.state.days}
                         changeDay={this.changeDay} />   
        );
    }
}

export default AddScheduleContainer;