import {combineReducers} from 'redux';
import page from './page';
import doctors from './doctors';

export default combineReducers({
  page,
  doctors
})