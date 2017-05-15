import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import * as doctorsActions from '../../actions/doctors-action';
import HttpService from '../http-service';
import AuthoriationService from '../authorization';
import AddMeeting from './add-meeting';
import moment from 'moment';
import config from 'react-global-configuration';
import axios from 'axios';
import * as _ from 'lodash';
import '../../../node_modules/moment/locale/ru.js';
import '../../../node_modules/moment/locale/uk.js';

class AddMeetingContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      choosenDate: null,
      allMeetings: [],
      availableHours: null,
      specialDays: null,
      currentSlots: [],
      busySlots: [],
      slotTimes: config.get('slotTimes')
    };
    this.dpChange = this.dpChange.bind(this);
  }
  
  componentWillMount() {
    this.getAllMeetings();
    // moment.locale('uk');
  }
  
  componentDidMount() {
    let schedule = _.concat(this.props.currentInfo.doctorData.available, this.props.currentInfo.doctorData.specialDays);
    this.setState({
      availableHours: schedule,
      specialDays: this.props.currentInfo.doctorData.specialDays
    }, function () {
      console.log(this.state.availableHours);
    });
  }
  
  renderChoosenDay(day) {
    this.setState({
      currentSlots: [],
      busySlots: []
    }, () => {
      _.filter(this.state.availableHours, (o) => {
        if (!o) {
          o = {};
        }
        if (o.day === day.weekday() || (moment(o.date).format('DD-MM-YYYY')) === (moment(day).format('DD-MM-YYYY'))) {
          _.filter(this.state.allMeetings, (meeting) => {
            if ((moment(meeting.date).format('DD-MM-YYYY')) === (moment(day).format('DD-MM-YYYY'))) {
              this.state.busySlots.push(meeting.slot);
            }
          });
          this.setState({
            currentSlots: o.slot
          });
        }
      });
    });
    
  }
  
  getAllMeetings() {
    axios.get(config.get('api') + 'meetings' + '?doctorId=' + this.props.currentDoctor)
         .then(res => {
           this.setState({allMeetings: res.data});
         });
  }
  
  dpChange(date) {
    this.setState({
      choosenDate: date
    }, () => {
      this.renderChoosenDay(date);
    });
  }
  
  render() {
    return (
        <div>
          <hr/>
          <AddMeeting toggleMeeting={this.props.toggleMeeting}
                      startDate={this.state.choosenDate}
                      dpChange={this.dpChange}
                      allMeetings={this.state.allMeetings}
                      currentSlots={this.state.currentSlots}
                      slotTimes={this.state.slotTimes}
                      busySlots={this.state.busySlots}
          />
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentDoctor: state.doctors.currentDoctor,
    listEmpty: state.doctors.listEmpty,
    role: state.activeUser.role
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setListEmpty: bindActionCreators(doctorsActions.listEmpty, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMeetingContainer);