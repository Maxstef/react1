import React from 'react';
import { Container } from 'reactstrap';
import { Link } from "react-router";
import config from 'react-global-configuration';
import AvatarImageCropper from 'react-avatar-image-cropper';
import moment from "moment";
import * as _ from 'lodash';
import AddSpecialDayContainer from "../add-special-day/add-special-day-container";


let renderSchedule = (days) => {
    if (days.length > 0) {
        return days.map((day, index) => (
            <AvailableDay key={index} day={day}/>
        ));
    } else return [];
}

const AvailableDay = ({day}) => {
    return (
        <tr>
            <td>{getDay(day.day)}</td>
            <td>{getHours(day.slot)}</td>
        </tr>
    )
}

let getDay = (n) => {
    switch(n){
        case 0:return "Monday";
        case 1:return "Tuesday";
        case 2:return "Wednesday";
        case 3:return "Thursday";
        case 4:return "Friday";
        case 5:return "Saturday";
        case 6:return "Sunday";
        default: return "wrong number";
    }
}

let getHours = (slots) => {
    let result = '';
    let slotsSorted = _.sortBy(slots);
    _.forEach(slotsSorted, (slot, index) => {
        if(index == 0){
            result += config.get("slotTimes")[slot].substr(0, 5) + " - ";
        } else if(slot - 1 == slots[index - 1] && (index + 1) !== slots.length){
            result += '';
        } else if(parseInt(slot) - 1 > parseInt(slots[index - 1]) && (index + 1) !== slots.length){
            result += config.get("slotTimes")[slots[index - 1]].substr(8, 13) + ', ';
            result += config.get("slotTimes")[slot].substr(0, 5) + " - ";
        } else if((index + 1) == slots.length){
            result += config.get("slotTimes")[slots[index]].substr(8, 13);
        }
    });
    return result;
}

class Cabinet extends React.Component {
    render() {
        return (
            <Container>
                <div className="cabinet">
                    <h3>Doctor's cabinet</h3>
                </div>
                <div className="row">
                    <div className="col-12 col-md-6">
                        {(this.props.user && (this.props.user.photoUrl === null || typeof this.props.user.photoUrl == 'undefined')) && 
                            <div style={{position: "relative", marginBottom: "20px"}}>
                                <img src={config.get('defaultAvatarUrl')} width="200"/>
                                <div className="upload-photo">
                                    <AvatarImageCropper apply={this.props.apply} maxsize={5*1024*1024} />
                                </div>
                            </div>
                        }
                        {(this.props.user && (this.props.user.photoUrl !== null && typeof this.props.user.photoUrl != 'undefined')) && 
                            <div style={{position: "relative", marginBottom: "20px"}}>
                                <img src={config.get('api') + this.props.user.photoUrl} width="200"/>
                                <div className="upload-photo">
                                    <AvatarImageCropper apply={this.props.apply} maxsize={5*1024*1024} />
                                </div>
                            </div>
                    }
                    </div>
                    <div className="col-12 col-md-6">
                        {(this.props.user !== null && this.props.user.doctorData.available) &&
                            <div>
                                <h4>Schedule</h4>
                                <table  className="table">
                                    <thead>
                                        <tr>
                                            <th>Day</th>
                                            <th>Hours</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {renderSchedule(this.props.user.doctorData.available)}
                                    </tbody>
                                </table>
                                <AddSpecialDayContainer/>
                            </div> 
                        }
                    </div>
                </div>        
            </Container>
        );
    }
}

export default Cabinet;