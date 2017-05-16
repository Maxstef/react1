import React from 'react';
import { Container, Input } from 'reactstrap';
import * as _ from 'lodash';


class AddSchedule extends React.Component {

    renderAvailableDays(){
        const Day = ({day, ranges, index, checked}) => {
            return (
                <div className="day-item row">
                    <div className="available-day-item">
                        <input type="checkbox" id={day} name={day} checked={checked} onChange={()=>{this.props.changeDay(index)}}/>
                        <label className={day} htmlFor={day}></label>
                    </div>
                    {checked && this.renderTimeRange(day, ranges)}
                </div>
            );
        };
        return this.props.days.map((day, index) => (
            <Day key={index} index={index} day={day.day} ranges={day.ranges} checked={day.available}/>
        ));
    }

    renderTimeRange(day, times){
        const Range = ({index}) => {
            return (
                <div className="available-hours-item col-4 row">
                    <div className="col-5">
                        <Input id={"from-" + day + "-" + index} type="text"/>
                    </div>
                    <div className="col-2" style={{textAlign: 'center'}}>
                        -
                    </div>
                    <div className="col-5">
                        <Input id={"to-" + day + "-" + index} type="text"/>
                    </div>
                </div>
            );
        };
        return Array.from(Array(times)).map((slot, index) => (
            <Range key={index} index={index}/>
        ));
    }

    render() {
        return (           
            <Container>             
                <div className="add-schedule">
                    {this.renderAvailableDays()}
                </div>
            </Container>   
        );
    }
}

export default AddSchedule;