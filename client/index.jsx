import React from 'react';
import ReactDOM from 'react-dom';
import HomeContainer from './src/components/home/home-container';
import Wrapper from './src/components/wrapper';
import DoctorInfoContainer from './src/components/doctor-info/doctor-info-container';
import DoctorsListContainer from './src/components/doctors-list/doctors-list-container';
import Meeting from './src/components/meeting';
import AdminDoctorsListContainer from './src/components/admin-doctors-list/admin-doctors-list-container';
import NotFound from './src/components/not-found';
import LoginContainer from './src/components/login/login-container';
import RegistrationContainer from './src/components/registration/registration-container';
import Cabinet from './src/components/cabinet';
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
            <Route path="doctor/:doctorId" component={DoctorInfoContainer}/>
            <Route path="doctors-list" component={DoctorsListContainer}/>
            <Route path="meeting" component={Meeting}/>
          </Route>
          
          <Route path="*" component={NotFound}/>
        </Router>
    ), document.getElementById('root')
);