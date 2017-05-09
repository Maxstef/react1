import React from 'react';
import ReactDOM from 'react-dom';
import Home from './src/components/home';
import Wrapper from './src/components/wrapper';
import DoctorInfo from './src/components/doctor-info';
import DoctorsListContainer from './src/components/doctors-list/doctors-list-container';
import Meeting from './src/components/meeting';
import NotFound from './src/components/not-found';
import Login from './src/components/login';
import Registration from './src/components/registration';
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
          <Route path="/" component={Login}/>
          <Route path="registration" component={Registration}/>
          
          <Route component={Wrapper}>
            <Route path="cabinet" component={Cabinet}/>
  
            <Route path="home" component={Home}/>
            <Route path="doctor/:doctorId" component={DoctorInfo}/>
            <Route path="doctors-list" component={DoctorsListContainer}/>
            <Route path="meeting" component={Meeting}/>
          </Route>
          
          <Route path="*" component={NotFound}/>
        </Router>
    ), document.getElementById('root')
);