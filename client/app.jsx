import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers} from "redux";
import {connect} from 'react-redux';
import Index from './src/index.jsx';
import { Provider } from 'react-redux';
import configureStore from './src/store/configure-store';

// export default class App extends React.Component {
//   render() {
//     return (
//         <Provider store={store}>
//           {() => <Index/> }
//         </Provider>
//     )
//   }
// }
// const initialUserState = {
//   users: []
// };
//
// const userReducer = function (state = initialUserState, action) {
//   switch (action.type) {
//     case 'USER_LIST_SUCCESS':
//       return Object.assign({}, state, {users: action.users});
//   }
//   return state;
// };
//
// const widgetReducer = function (state = {}, action) {
//   return state;
// };
//
// const reducers = combineReducers({
//   userState: userReducer,
//   widgetState: widgetReducer
// });
//
// const reducer = combineReducers(reducers);
//
// const store = createStore(reducer);

const store = configureStore();

ReactDOM.render((
    <Provider store={store}>
      <Index/>
    </Provider>
    ), document.getElementById('root')
);
