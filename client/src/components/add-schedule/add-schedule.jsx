import React from 'react';
import { Container, Input, Button } from 'reactstrap';
import * as _ from 'lodash';
import InputMask from 'react-input-mask';


class AddSchedule extends React.Component {

    renderAvailableDays(){
        const Day = ({day, ranges, index, checked}) => {
            return (
                <div className="day-item row" style={{padding: "15px 0", borderBottom: "1px solid #d1d3d4"}}>
                    <div className="col-3 col-md-2 col-lg-1">
                        <div className="available-day-item">
                            <input type="checkbox" id={day} name={day} checked={checked} onChange={()=>{this.props.changeDay(index)}}/>
                            <label className={day} htmlFor={day}></label>
                        </div>
                        <div>
                            {checked && ranges < 6 && 
                                <Button style={{marginLeft: "6px"}} onClick={()=>{this.props.newRange(index)}} type="button" color="success">
                                    <i className="fa fa-plus-circle" aria-hidden="true"></i>
                                </Button>
                            }
                            {checked && ranges > 1 && 
                                <Button style={{marginLeft: "6px"}} onClick={() => { this.props.removeRange(index) }} type="button" color="danger" >
                                    <i className="fa fa-trash" aria-hidden="true"></i>
                                </Button>
                            }
                        </div>
                    </div>
                    <div className="col-9 col-md-10 col-lg-11 row">
                        {checked && this.renderTimeRange(day, ranges, index)}
                    </div>
                </div>
            );
        };
        return this.props.days.map((day, index) => (
            <Day key={index} index={index} day={day.day} ranges={day.timeValue.length} checked={day.available}/>
        ));
    }

    renderTimeRange(day, times, dayIndex){
        const Range = ({index}) => {
            return (
                <div className="available-hours-item col-12 col-sm-12 col-md-9 col-lg-6 col-xl-4  row">
                    <div className="col-12 col-sm-5">
                        <Input type="select" id={"from-" + day + "-" + index} name={"from-" + day + "-" + index}>
                            {this.renderOptions()}
                        </Input>
                        {/*
                        <InputMask className="form-control" mask="12:34" onFocus={() => {this.props.setFocus(dayIndex, index, 'start')}}
                        autoFocus={(this.props.focus.day == dayIndex && this.props.focus.range == index && this.props.focus.key == 'start')?true:false}
                        formatChars={{
                            '1': '[0-2]',
                            '2': this.props.days[dayIndex].timeValue[index].start.startsWith('2') ? '[0-3]' : '[0-9]',
                            '3': '[0-5]',
                            '4': '[0-9]'
                        }}
                        value={this.props.days[dayIndex].timeValue[index].start} 
                        id={"from-" + day + "-" + index} type="text"
                        onChange={(e)=> {this.props.changeTimeValue(dayIndex, index, 'start', e.target)}}/>*/}
                    </div>
                    <div className="col-12 col-sm-2" style={{textAlign: 'center'}}>
                        -
                    </div>
                    <div className="col-12 col-sm-5">
                        <Input type="select" id={"to-" + day + "-" + index} name={"to-" + day + "-" + index}>
                            {this.renderOptions()}
                        </Input>
                        {/*
                        <InputMask className="form-control" mask="12:34" onFocus={() => {this.props.setFocus(dayIndex, index, 'end')}}
                        autoFocus={(this.props.focus.day == dayIndex && this.props.focus.range == index && this.props.focus.key == 'end')?true:false}
                        formatChars={{
                            '1': '[0-2]',
                            '2': this.props.days[dayIndex].timeValue[index].end.startsWith('2') ? '[0-3]' : '[0-9]',
                            '3': '[0-5]',
                            '4': '[0-9]'
                        }}
                        value={this.props.days[dayIndex].timeValue[index].end} 
                        id={"to-" + day + "-" + index} type="text"
                        onChange={(e)=> {this.props.changeTimeValue(dayIndex, index, 'end', e.target)}}/>*/}
                    </div>
                </div>
            );
        };
        return Array.from(Array(times)).map((slot, index) => (
            <Range key={index} index={index}/>
        ));
    }

    renderOptions(){
        const Slot = ({slot}) => {
            return (
                    <option>{this.props.slotTimes[slot].substr(0, 5)}</option>
            );
        };
        return Array.from(Array(48)).map((slot, index) => (
            <Slot key={index} slot={index}/>
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