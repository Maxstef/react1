import React from 'react';
import ReactDOM from 'react-dom';
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
import * as Redux from "redux";
import {createStore, combineReducers} from "redux";
import {connect} from 'react-redux';


// The User Reducer
const initialUserState = {
  users: []
};

const userReducer = function (state = initialUserState, action) {
  switch (action.type) {
    case 'USER_LIST_SUCCESS':
      return Object.assign({}, state, {users: action.users});
  }
  return state;
};

// The Widget Reducer
const widgetReducer = function (state = {}, action) {
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

export default class Index extends React.Component {
  
  render() {
    return (
        // ReactDOM.render((
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
            // ), document.getElementById('root')
        
    )
  }
}


