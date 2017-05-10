import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers} from "redux";
import {connect} from 'react-redux';
import Index from './src/index.jsx';

export default class App extends React.Component {
  render() {
    return (
        ReactDOM.render((
                <div>
                  <Index/>
                </div>
            ), document.getElementById('root')
        )
    )
  }
}