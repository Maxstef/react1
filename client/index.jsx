import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/home';
import Wrapper from './components/wrapper';
import DoctorInfo from './components/doctor-info';
import DoctorsList from './components/doctors-list';
import Meeting from './components/meeting';
import NotFound from './components/not-found';
import {Router, Route, IndexRoute, browserHistory, hashHistory} from "react-router";
import createBrowserHistory from 'history/createBrowserHistory';

ReactDOM.render((
        <Router history={browserHistory}>
          <Route path="/" component={Home}/>
          
          <Route component={Wrapper}>
            <Route path="doctor/:doctorId" component={DoctorInfo}/>
            <Route path="doctors-list" component={DoctorsList}/>
            <Route path="meeting" component={Meeting}/>
          </Route>
          
          <Route path="*" component={NotFound}/>
        </Router>
    ), document.getElementById('root')
);