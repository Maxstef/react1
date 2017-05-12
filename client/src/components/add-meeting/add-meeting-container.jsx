import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import * as doctorsActions from '../../actions/doctors-action';
import HttpService from '../http-service';
import AuthoriationService from '../authorization';
import AddMeeting from './add-meeting';

class AddMeetingContainer extends React.Component {
  
  render() {
    return (
        <div>
          <AddMeeting toggleMeeting={this.props.toggleMeeting}/>
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    info: state.doctors.info,
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