import React from 'react';
import {Link, browserHistory} from "react-router";
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Validation from 'react-validation';
import validator from 'validator';
import axios from 'axios';
import Registration from './registration'


Object.assign(Validation.rules, {
    required: {
        rule: value => {
            return value.toString().trim();
        },
        hint: value => {
            return <span className='form-error is-visible'>Required</span>
        }
    },
    minThree: {
      rule: value => {
        return value.toString().trim().length > 2;
      },
      hint: value => {
        return <span className='form-error is-visible'>Minimum 3 characters</span>
      }
    },
    number: {
      rule: value => {
        return validator.isNumeric(value);
      },
      hint: value => {
        return <span className='form-error is-visible'>{value} isn't a number.</span>
      }
    },
    onlyLetters: {
      rule: value => {
        return value.match(/^[a-zA-Z.\-_]*$/);
      },
      hint: value => {
        return <span className='form-error is-visible'>Only latin letters allowed</span>
      }
    },
    email: {
        rule: value => {
            return validator.isEmail(value);
        },
        hint: value => {
            return <span className='form-error is-visible'>{value} isn't an Email.</span>
        }
    },
    password: {
        rule: (value, components) => {
            const password = components.password.state;
            const passwordConfirm = components.passwordConfirm.state;
            const isBothUsed = password
                && passwordConfirm
                && password.isUsed
                && passwordConfirm.isUsed;
            const isBothChanged = isBothUsed && password.isChanged && passwordConfirm.isChanged;
 
            if (!isBothUsed || !isBothChanged) {
                return true;
            }
 
            return password.value === passwordConfirm.value;
        },
        hint: () => <span className="form-error is-visible">Passwords should be equal.</span>
    }
});

class RegistrationContainer extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            dateOB: moment(),
            success: false,
            error: false,
            errorMessage: '',
            username: ''
        };
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.cleanError = this.cleanError.bind(this);
    }

    componentWillMount(){
        if(localStorage.getItem('username') !== null && localStorage.getItem('id') !== null){
            browserHistory.push('/home');
        }
    }

    handleDateChange(date) {
        this.setState({
            dateOB: date
        });
    }

    handleSubmit(e){
        e.preventDefault();
        var t = this;
        axios.post('http://localhost:3000/registration', {
            firstName: e.target.firstName.value,
            lastName: e.target.lastName.value,
            patronymic: e.target.patronymic.value,
            dateOfBirth: this.state.dateOB,
            street: e.target.street.value,
            building: e.target.building.value,
            appartment: e.target.appartment.value,
            email: e.target.email.value,
            phoneNumber: e.target.phone.value,
            username: e.target.username.value,
            password: e.target.password.value
        })
        .then(function (response) {
            if(typeof response.data.error == 'undefined'){
                t.setState({success: true, error: false, username: response.data.username});
            } else {
                t.setState({error: true, errorMessage: response.data.error});
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    cleanError(){
        this.setState({error: false});
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
                          username={this.state.username}>
            </Registration>
        );
    }
}

export default RegistrationContainer;