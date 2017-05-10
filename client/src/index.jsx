import React from 'react';
import HomeContainer from './components/home/home-container';
import Wrapper from './components/wrapper';
import DoctorInfoContainer from './components/doctor-info/doctor-info-container';
import DoctorAddEditContainer from './components/doctor-add-edit/doctor-add-edit-container';
import DoctorsListContainer from './components/doctors-list/doctors-list-container';
import Meeting from './components/meeting';
import NotFound from './components/not-found';
import Cabinet from './components/cabinet';
import {Router, Route, IndexRoute, browserHistory, hashHistory} from "react-router";
import {connect} from 'react-redux';
import AdminDoctorsListContainer from './components/admin-doctors-list/admin-doctors-list-container';
import LoginContainer from './components/login/login-container';
import RegistrationContainer from './components/registration/registration-container';

export default class Index extends React.Component {
  
  render() {
    return (
        <Router history={browserHistory}>
          <Route path="/" component={LoginContainer}/>
          <Route path="registration" component={RegistrationContainer}/>
          
          <Route component={Wrapper}>
            <Route path="cabinet" component={Cabinet}/>
            <Route path="admin-doctors-list" component={AdminDoctorsListContainer}/>
            <Route path="home" component={HomeContainer}/>
            <Route path="doctor/:doctorId" component={DoctorInfoContainer}/>
            <Route path="doctor-add-edit/:doctorId" component={DoctorAddEditContainer}/>
            <Route path="doctors-list" component={DoctorsListContainer}/>
            <Route path="meeting" component={Meeting}/>
          </Route>
          
          <Route path="*" component={NotFound}/>
        </Router>
    )
  }
}


