import React from 'react';
import {Container, Button, Form, FormGroup, Label, Input, FormText, Col} from 'reactstrap';
import {Link, browserHistory} from "react-router";
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Validation from 'react-validation';
import validator from 'validator';
import axios from 'axios';


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

class Registration extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      dateOB: moment(),
      success: false,
      error: false,
      errorMessage: '',
      username: '',
      borderErr: {
        borderColor: '#d9534f',
      }
    };
    this.handleDateChange = this.handleDateChange.bind(this);
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

  render() {
    return (
        <Container>
          <div className="registration">
            <h3>Registration in clinic</h3>
              {this.state.success &&
              <div className="alert alert-success">
                  registration success! Your username {this.state.username} <Link to="/">login</Link>
              </div>
              }
              {!this.state.success &&

            <Validation.components.Form onSubmit={this.handleSubmit.bind(this)}>
              <FormGroup row tag="fieldset">
                <legend className="col-form-legend">Personal data</legend>
                <FormGroup row>
                  <Label for="firstName" md={3}>First name:</Label>
                  <Col md={9}>
                    <Validation.components.Input type="text" errorClassName='is-invalid-input'
                      value='' className="form-control" name="firstName" 
                      id="firstName" placeholder="first name" validations={['required', 'onlyLetters']} />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="lastName" md={3}>Last name:</Label>
                  <Col md={9}>
                    <Validation.components.Input className="form-control" type="text" 
                      value='' name="lastName" id="lastName" placeholder="last name"
                      errorClassName='is-invalid-input' validations={['required', 'onlyLetters']} />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="patronymic" md={3}>Patronymic:</Label>
                  <Col md={9}>
                    <Validation.components.Input className="form-control" type="text" 
                      value='' name="patronymic" id="patronymic" placeholder="patronymic"
                      errorClassName='is-invalid-input' validations={['required', 'onlyLetters']}/>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="dateOfBirth" md={3}>Date of birth:</Label>
                  <Col md={9}>
                    <DatePicker selected={this.state.dateOB} onChange={this.handleDateChange} />
                  </Col>
                </FormGroup>
              </FormGroup>

              <FormGroup row tag="fieldset">
                <legend className="col-form-legend">Address</legend>
                <FormGroup row>
                  <Col md={{size: 6, offset: 0}} xs={{size: 12, offset: 0}}>
                    <Validation.components.Input value='' className="form-control" 
                      type="text" name="street" id="street" placeholder="street name" 
                      errorClassName='is-invalid-input' validations={['required']}/>
                  </Col>
                  <Col md={{size: 3, offset: 0}} xs={{size: 6, offset: 0}}>
                    <Validation.components.Input value='' className="form-control" 
                      type="text" name="building" id="building" placeholder="building" 
                      errorClassName='is-invalid-input' validations={['required']}/>
                  </Col>
                  <Col md={{size: 3, offset: 0}} xs={{size: 6, offset: 0}}>
                    <Validation.components.Input value='' className="form-control" 
                      type="text" name="appartment" id="appartment" placeholder="appartment" 
                      errorClassName='is-invalid-input' validations={['required', 'number']}/>
                  </Col>
                </FormGroup>
              </FormGroup>

              <FormGroup row tag="fieldset">
                <legend className="col-form-legend">Contacts</legend>
                <FormGroup row>
                  <Col md={{size: 6, offset: 0}} xs={{size: 12, offset: 0}}>
                    <Validation.components.Input className="form-control" value="" type="text" errorClassName='is-invalid-input' 
                      name="email" id="email" placeholder="email" validations={['required', 'email']} />
                  </Col>
                  <Col md={{size: 6, offset: 0}} xs={{size: 12, offset: 0}}>
                    <Validation.components.Input className="form-control" value="" type="text" errorClassName='is-invalid-input' 
                      name="phone" id="phone" placeholder="phone number" validations={['required', 'number']} />
                  </Col>
                </FormGroup>
              </FormGroup>

              <FormGroup row tag="fieldset">
                <legend className="col-form-legend">Login data</legend>
                <FormGroup row>
                  <Label for="username" md={3}>Username:</Label>
                  <Col md={9}>
                    <Validation.components.Input className="form-control" value=""
                      type="text" name="username" id="username" placeholder="username" 
                      errorClassName='is-invalid-input' validations={['required', 'minThree']} />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="password" md={3}>Password:</Label>
                  <Col md={9}>
                    <Validation.components.Input className="form-control" value=""
                      type="password" name="password" id="password" placeholder="password" 
                      errorClassName='is-invalid-input' validations={['required', 'minThree']}/>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="passwordConfirm" md={3}>Confirm password:</Label>
                  <Col md={9}>
                    <Validation.components.Input className="form-control" value="" 
                      type="password" name="passwordConfirm" id="passwordConfirm" placeholder="confirm password"
                      errorClassName='is-invalid-input' validations={['required', 'password', 'minThree']}/>
                  </Col>
                </FormGroup>
              </FormGroup>
              <Validation.components.Button className="submit-btn pull-right btn btn-primary">Submit</Validation.components.Button>
            </Validation.components.Form>
              }
              {this.state.error &&
              <div className="alert alert-danger" style={{width: '70%',float:'left'}}>
                  {this.state.errorMessage}
              </div>
              }
          </div>
        </Container>
    );
  }
}

export default Registration;