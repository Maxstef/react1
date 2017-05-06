import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/home';
import Container from './components/container';
import Content from './components/content';
import DoctorsList from './components/doctors-list';
import {Router, Route, IndexRoute, browserHistory, hashHistory} from "react-router";
import createBrowserHistory from 'history/createBrowserHistory';

ReactDOM.render((
        <Router history={hashHistory}>
          <Route path="/" component={Home}/>
          <Route component={Container}>
            <Route path="user" component={Content}/>
            <Route path="list" component={DoctorsList}/>
          </Route>
        </Router>
    ), document.getElementById('root')
);