import React from 'react';
import { Link, browserHistory } from "react-router";
import DatePicker from 'react-datepicker';
import moment from 'moment';
import axios from 'axios';
import Registration from './registration';
import config from 'react-global-configuration';

class RegistrationContainer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      formValue: {
        firstName: "",
        lastName: "",
        patronymic: "",
        street: "",
        building: "",
        appartment: "",
        email: "",
        phoneNumber: "",
        username: "",
        password: "",
        passwordConfirm: ""
      },
      dateOB: moment(),
      success: false,
      error: false,
      errorMessage: '',
      username: '',
      step: 1
    };
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.cleanError = this.cleanError.bind(this);
    this.changeStep = this.changeStep.bind(this);
    this.setValue = this.setValue.bind(this);
  }

  componentWillMount() {
    if (localStorage.getItem('username') !== null && localStorage.getItem('id') !== null) {
      browserHistory.push('/home');
    }
  }

  handleDateChange(date) {
    this.setState({
      dateOB: date
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    var t = this,
        data = this.state.formValue;
    data.dateOfBirth = this.state.dateOB;
    axios.post(config.get('api') + 'registration', data)
      .then(function (response) {
        if (typeof response.data.error == 'undefined') {
          t.setState({ success: true, error: false, username: response.data.username });
        } else {
          t.setState({ error: true, errorMessage: response.data.error });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  cleanError() {
    this.setState({ error: false });
  }

  changeStep(n){
    if(n == 2 && this.state.firstTime){
      this.setState({disabled: true});
      this.setState({firstTime: false});
    }
    this.setState({step: n});
  }

  setValue(key, value){
    let data = this.state.formValue;
    data[key] = value;
    this.setState({formValue: data});
  }

  render() {
    return (
      <Registration handleSubmit={this.handleSubmit}
        cleanError={this.cleanError}
        handleDateChange={this.handleDateChange}
        dateOB={this.state.dateOB}
        success={this.state.success}
        error={this.state.error}
        errorMessage={this.state.errorMessage}
        username={this.state.username}
        step={this.state.step}
        changeStep={this.changeStep}
        formValue={this.state.formValue}
        setValue={this.setValue}>
      </Registration>
    );
  }
}

export default RegistrationContainer;