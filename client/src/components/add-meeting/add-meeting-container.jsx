import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as doctorsActions from "../../actions/doctors-action";
import AddMeeting from "./add-meeting";
import moment from "moment";
import config from "react-global-configuration";
import axios from "axios";
import * as _ from "lodash";
import "../../../node_modules/moment/locale/ru.js";
import "../../../node_modules/moment/locale/uk.js";

class AddMeetingContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      backdrop: 'static',
      choosenDate: null,
      allMeetings: [],
      availableHours: null,
      specialDays: null,
      openDates: [],
      daysShift: 29,
      currentSlots: [],
      busySlots: [],
      slotTimes: config.get('slotTimes'),
      date: null,
      newMeeting: {},
      newEvent: {}
    };
    this.dpChange = this.dpChange.bind(this);
    this.addMeeting = this.addMeeting.bind(this);
    this.postMeeting = this.postMeeting.bind(this);
    this.toggle = this.toggle.bind(this);
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
      if (schedule[0] || schedule[1]) {
        this.findAvailableDates();
      }
    });
  }
  
  componentWillUnmount() {
    this.props.setAllMeetingsStore([]);
  }
  
  renderChoosenDay(day) {
    this.setState({
      currentSlots: [],
      busySlots: [],
      date: day
    }, () => {
      _.filter(this.state.availableHours, (o) => {
        if (!o) {
          o = {};
        }
        if (o.day === day.weekday() || (moment(o.date).format('DD-MM-YYYY')) === (moment(day).format('DD-MM-YYYY'))) {
          let newBusySlot = [];
          _.filter(this.state.allMeetings, (meeting) => {
            if ((moment(meeting.date).format('DD-MM-YYYY')) === (moment(day).format('DD-MM-YYYY'))) {
              newBusySlot.push(meeting.slot);
            }
          });
          this.setState({
            currentSlots: o.slot,
            busySlots: newBusySlot
          });
        }
      });
    });
  }
  
  addMeeting(slotNumber) {
    let newMeeting = {};
    let patient = this.props.userId;
    let patientId = this.props.userId;
    let doctor = this.props.currentInfo._id;
    let doctorId = this.props.currentInfo._id;
    let date = moment(this.state.date).format();
    let slot = slotNumber;
    this.toggle();
    newMeeting = {patient, patientId, doctor, doctorId, date, slot};
    this.setState({
      newMeeting: newMeeting,
    });
  }
  
  postMeeting() {
    let newBusySlot = this.state.busySlots;
    let allMeetings = this.state.allMeetings;
    axios.post(config.get('api') + 'meetings/', this.state.newMeeting).then(res => {
      console.log(res);
      newBusySlot.push(this.state.newMeeting.slot);
      allMeetings.push(this.state.newMeeting);
      this.setState({
            allMeetings: allMeetings,
            busySlots: newBusySlot
          }, () => {
            // console.log(this.state.busySlots, this.state.allMeetings);
          }
      );
    })
  }
  
  getAllMeetings() {
    axios.get(config.get('api') + 'meetings' + '?doctorId=' + this.props.currentDoctor)
         .then(res => {
           this.setState({allMeetings: res.data});
           // this.props.setAllMeetingsStore(res.data);
           console.log(res.data);
         });
  }
  
  findAvailableDates() {
    this.setState({
      openDates: []
    }, () => {
      let openDates = [];
      this.state.availableHours.map((day) => {
        if (day.day) {
          let week = 0;
          while (week < this.state.daysShift) {
            let diff = (day.day - moment().weekday()) + week;
            let date = moment().add((diff), 'days');
            week += 7;
            date = moment(date._d).format();
            console.log();
            openDates.push(date);
          }
        }
        else if (day.date) {
          openDates.push(day.date);
        }
      });
      this.setState({
        openDates: openDates.map(function (date) {
          return moment(date)
        })
      }, () => {
        // console.log(this.state.openDates);
      });
    });
  }
  
  dpChange(date) {
    this.setState({
      choosenDate: date
    }, () => {
      this.renderChoosenDay(date);
    });
  }
  
  toggle() {
    this.setState({
      modal: !this.state.modal
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
                      openDates={this.state.openDates}
                      addMeeting={this.addMeeting}
                      toggle={this.toggle}
                      modal={this.state.modal}
                      backdrop={this.state.backdrop}
                      postMeeting={this.postMeeting}
          />
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentDoctor: state.doctors.currentDoctor,
    listEmpty: state.doctors.listEmpty,
    allMeetingsStore: state.doctors.allMeetings,
    role: state.activeUser.role,
    userId: state.activeUser.info._id
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setListEmpty: bindActionCreators(doctorsActions.listEmpty, dispatch),
    setAllMeetingsStore: bindActionCreators(doctorsActions.setAllMeetings, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMeetingContainer);