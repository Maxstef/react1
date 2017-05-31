import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as doctorsActions from "../../actions/doctors-action";
import ShowAppointments from "./show-appointments";
import moment from "moment";
import config from "react-global-configuration";
import axios from "axios";
import * as _ from "lodash";

class ShowAppointmentsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      backdrop: 'static',
      choosenDate: null,
      allMeetings: [],
      openDates: [],
      currentSlots: [],
      busySlots: [],
      slotTimes: config.get('slotTimes'),
      date: null,
      meetingSlot: null,
      myCurrentMeeting: [],
      todayMeetings: []
    };
    this.dpChange = this.dpChange.bind(this);
    this.toggle = this.toggle.bind(this);
    this.getAllMeetings = this.getAllMeetings.bind(this);
  }
  
  componentWillMount() {
    this.getAllMeetings();
  }
  
  componentWillUnmount() {
    // this.props.setAllMeetingsStore([]);
  }
  
  // if datapicker changed
  renderChoosenDay(day) {
    let currentSlots = [];
    let todayMeetings = [];
    this.setState({
      currentSlots: [],
      todayMeetings: [],
      date: day
    }, () => {
      _.filter(this.state.allMeetings, (meeting) => {
        if (moment(meeting.date).format('DD-MM-YYYY') === moment(day).format('DD-MM-YYYY')) {
          todayMeetings.push(meeting);
          currentSlots.push(meeting.slot);
        }
      });
      this.setState({
          currentSlots: currentSlots,
          todayMeetings: todayMeetings
      });
    });
  }
  
  getAllMeetings() {
    axios.get(config.get('api') + 'meetings' + '?doctorId=' + localStorage.getItem('id'))
         .then(res => {
             this.setState({
               allMeetings: res.data
             }, () => {
               console.log(res.data);
               this.setState({
                 openDates: []
               }, () => {
                 let openDates = [];
                 this.state.allMeetings.map((meeting) => {
                   openDates.push(meeting.date);
                 });
                 this.setState({
                   openDates: openDates.map(function (date) {
                     return moment(date)
                   })
                 })
               });
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
          <ShowAppointments toggleMeeting={this.props.toggleMeeting}
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
                      doctorsName={this.props.doctorsName}
                      day={moment(this.state.date).format('DD MMM YYYY, dddd')}
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
    userId: state.activeUser.info,
    id: state.activeUser.id
  }
}
  
  function mapDispatchToProps(dispatch) {
  return {
    setListEmpty: bindActionCreators(doctorsActions.listEmpty, dispatch),
    setAllMeetingsStore: bindActionCreators(doctorsActions.setAllMeetings, dispatch),
    setCurrentDoctor: bindActionCreators(doctorsActions.setCurrentDoctor, dispatch)
  }
}
  
  export default connect(mapStateToProps, mapDispatchToProps)(ShowAppointmentsContainer);
