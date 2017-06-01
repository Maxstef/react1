import React from 'react';
import DoctorsList from './doctors-list';
import AdminDoctorsList from './admin-doctors-list';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as doctorsActions from '../../actions/doctors-action';
import HttpService from '../http-service';
import AuthoriationService from '../authorization';

class DoctorsListContainer extends React.Component {

  render() {
    return (
      <div>
        <HttpService />
        <AuthoriationService />
        {(this.props.role === 'admin' && typeof this.props.info == "object") && <AdminDoctorsList info={this.props.info} />}
        {((this.props.role === 'patient' || this.props.role === 'guest') && typeof this.props.info == "object") && <DoctorsList info={this.props.info} />}
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorsListContainer);