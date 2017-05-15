import React from 'react';
import DoctorInfo from './doctor-info';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import * as doctorsActions from '../../actions/doctors-action';
import * as _ from 'lodash';
import AddMeetingContainer from '../add-meeting/add-meeting-container';

class DoctorInfoContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      backdrop: "static",
      info: {},
      name: {},
      doctorType: {},
      currentInfo: {},
      meeting: false
    };
    // this.toggle = this.toggle.bind(this);
    this.toggleMeeting = this.toggleMeeting.bind(this);
  };
  
  componentWillMount() {
    this.takeDoctorInfo(this.props.info);
    this.props.setCurrentDoctor(this.props.params.doctorId);
  }
  
  componentDidMount() {
    // console.log(this.state.currentInfo, this.state.doctorType);
  }
  
  takeDoctorInfo(info) {
    _.filter(info, (o) => {
      if (o._id === this.props.params.doctorId) {
        let currentInfo = o;
        let doctorType = o.doctorData.doctorType;
        let name = o.name;
        this.setState({
          currentInfo: currentInfo,
          doctorType: doctorType,
          name: name
        }, function () {
          // console.log(this.state.currentInfo);
        });
        return o;
      }
    });
  }
  
  // toggle() {
  //   this.setState({
  //     modal: !this.state.modal
  //   });
  // }
  
  toggleMeeting() {
    this.setState({
      meeting: !this.state.meeting
    });
  }
  
  render() {
    return (
        <div>
          <DoctorInfo modal={this.state.modal}
                      backdrop={this.state.backdrop}
                      toggle={this.toggle}

                      info={this.state.currentInfo}
                      name={this.state.name}
                      doctorType={this.state.doctorType}
                      doctorId={this.props.params.doctorId}
                      currentDoctor={this.props.currentDoctor}
                      listEmpty={this.props.listEmpty}
                      toggleMeeting={this.toggleMeeting}
                      meeting={this.state.meeting}
          />
          { this.state.meeting && <AddMeetingContainer
              toggleMeeting={this.toggleMeeting}
              meeting={this.state.meeting}
          />}
        </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    info: state.doctors.info,
    listEmpty: state.doctors.listEmpty,
    currentDoctor: state.doctors.currentDoctor
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentDoctor: bindActionCreators(doctorsActions.setCurrentDoctor, dispatch),
    setListEmpty: bindActionCreators(doctorsActions.listEmpty, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorInfoContainer);