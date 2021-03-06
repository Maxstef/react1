import React from 'react';
import {Container, Alert} from 'reactstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import * as activeUserActions from '../../actions/active-user-action';
import {browserHistory} from "react-router";
import Cabinet from './cabinet';
import ShowAppointmentsContainer from '../show-appointments/show-appointments-container';
import AddScheduleContainer from '../add-schedule/add-schedule-container';
import AuthoriationService from '../authorization';
import axios from 'axios';
import config from 'react-global-configuration';

class CabinetContainer extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      appointments: false
    };
    this.savePhoto = this.savePhoto.bind(this);
    this.apply = this.apply.bind(this);
    this.uploadRequest=this.uploadRequest.bind(this);
    this.toggleAppointments = this.toggleAppointments.bind(this);
  }
  
  toggleAppointments() {
    console.log("toggleAppointments");
    this.setState({
      appointments: !this.state.appointments
    });
  }
  
  redirect() {
    browserHistory.replace('/');
  }
  
  savePhoto(photoUrl){
        axios.put(config.get('api') + 'doctors/' + this.props.user._id, { photoUrl: photoUrl })
            .then(res => {
                let user = this.props.user;
                user.photoUrl = res.data.photoUrl;
                this.props.setInfo(user);
                this.forceUpdate();
            });
    }

    apply(file) {
        let formData = new FormData();
        formData.append('file', file, "imageCropped.jpg");
        let xhr = this.uploadRequest(formData);
        axios.post(config.get('api') + "upload-photo", formData)
            .then(res => {
                this.savePhoto(res.data.fileName);
            });
    }

    uploadRequest(formData) {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', config.get('api') + "upload-photo", true);
        xhr.setRequestHeader("enctype", "multipart/form-data");
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.setRequestHeader("Cache-Control", "no-store");
        xhr.setRequestHeader("Pragma", "no-cache");
        xhr.send(formData);
        return xhr;
    }

    render() {
        return (
            <Container>
                <AuthoriationService />
                {(this.props.user && this.props.user.doctorData.isDeleted) && 
                    <Alert color="danger">
                        <strong>That's too bad!</strong> Your account had been deleted
                    </Alert>
                }
                {(this.props.user && !this.props.user.doctorData.isDeleted && (typeof this.props.user.doctorData.available == 'undefined' || this.props.user.doctorData.available === null)) &&
                    <div>
                        <h5>You didn't specify your schedule. Do it for patients can make meeting with you.</h5>
                        <AddScheduleContainer />
                    </div>
                }
                {(this.props.role === 'guest' || this.props.role === 'patient' || this.props.role === 'admin') && this.redirect()}
                {(this.props.role === 'doctor' && (this.props.user && !this.props.user.doctorData.isDeleted && 
                    (!(typeof this.props.user.doctorData.available == 'undefined' || this.props.user.doctorData.available === null)))) &&
                    <Cabinet
                        apply={this.apply}
                        toggleUploader={this.toggleUploader}
                        uploaderDispalay={this.state.uploaderDispalay}
                        user={this.props.user}
                        toggleAppointments={this.toggleAppointments}
                        savePhoto={this.savePhoto} />}
               { this.state.appointments && <ShowAppointmentsContainer
              
              // availableHours={this.state.availableHours}
              // currentInfo={this.state.currentInfo}
              // doctorsName={this.state.name}
          />}
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        role: state.activeUser.role,
        user: state.activeUser.info
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setInfo: bindActionCreators(activeUserActions.setUserInfo, dispatch),
        setRole: bindActionCreators(activeUserActions.setRole, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CabinetContainer);