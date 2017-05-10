import React from 'react';
import ReactDOM from 'react-dom';
import HomeContainer from './components/home/home-container';
import Wrapper from './components/wrapper';
import DoctorInfoContainer from './components/doctor-info/doctor-info-container';
import DoctorAddEditContainer from './components/doctor-add-edit/doctor-add-edit-container';
import DoctorsListContainer from './components/doctors-list/doctors-list-container';
import Meeting from './components/meeting';
import AdminDoctorsListContainer from './components/admin-doctors-list/admin-doctors-list-container';
import NotFound from './components/not-found';
import LoginContainer from './components/login/login-container';
import RegistrationContainer from './components/registration/registration-container';
import Cabinet from './components/cabinet';
import {Router, Route, IndexRoute, browserHistory, hashHistory} from "react-router";
import * as Redux from "redux";
import {createStore, combineReducers} from "redux";
// import createBrowserHistory from 'history/createBrowserHistory';

// The User Reducer
const initialUserState = {
  users: []
};

const userReducer = function(state = initialUserState, action) {
  switch(action.type) {
    case 'USER_LIST_SUCCESS':
      return Object.assign({}, state, { users: action.users });
  }
  return state;
};

// The Widget Reducer
const widgetReducer = function(state = {}, action) {
  return state;
};

// Combine Reducers
const reducers = combineReducers({
  userState: userReducer,
  widgetState: widgetReducer
});

// Create a store by passing in the reducer
const store = createStore(reducers);

// Dispatch our first action to express an intent to change the state
store.dispatch({
  type: 'USER_LIST_SUCCESS',
  users: {name: 'Danny', state: 'off'}
});

console.log(store.getState());

ReactDOM.render((
        <Router history={browserHistory}>
          <Route path="/" component={LoginContainer}/>
          <Route path="registration" component={RegistrationContainer}/>
          
          <Route component={Wrapper}>
            <Route path="cabinet" component={Cabinet}/>
  			    <Route path="admin-doctors-list" component={AdminDoctorsListContainer}/>
            <Route path="home" component={HomeContainer}/>
            <Route path="doctor-add-edit/:doctorId" component={DoctorAddEditContainer}/>
            <Route path="doctor/:doctorId" component={DoctorInfoContainer}/>
            <Route path="doctors-list" component={DoctorsListContainer}/>
            <Route path="meeting" component={Meeting}/>
          </Route>
          
          <Route path="*" component={NotFound}/>
        </Router>
    ), document.getElementById('root')
);