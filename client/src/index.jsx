import React from 'react';
import Home from './components/home';
import Wrapper from './components/wrapper';
import DoctorInfoContainer from './components/doctor-info/doctor-info-container';
import DoctorsListContainer from './components/doctors-list/doctors-list-container';
import Meeting from './components/meeting';
import NotFound from './components/not-found';
import Login from './components/login';
import Registration from './components/registration';
import Cabinet from './components/cabinet';
import {Router, Route, IndexRoute, browserHistory, hashHistory} from "react-router";
import {connect} from 'react-redux';

export default class Index extends React.Component {
  
  render() {
    return (
        <Router history={browserHistory}>
          <Route path="/" component={Login}/>
          <Route path="registration" component={Registration}/>
          
          <Route component={Wrapper}>
            <Route path="cabinet" component={Cabinet}/>
            
            <Route path="home" component={Home}/>
            <Route path="doctor/:doctorId" component={DoctorInfoContainer}/>
            <Route path="doctors-list" component={DoctorsListContainer}/>
            <Route path="meeting" component={Meeting}/>
          </Route>
          
          <Route path="*" component={NotFound}/>
        </Router>
    )
  }
}


