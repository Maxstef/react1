import React from 'react';
import {Container, Button, Form, FormGroup, Label, Input, FormText, Col} from 'reactstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';

//import * as style from 'react-datepicker/dist/react-datepicker.css';

class Registration extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      dateOB: moment()
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      dateOB: date
    });
  }

  render() {
    return (
        <Container>
          <div className="registration">
            <h3>Registration in clinic</h3>
            <Form>
              <FormGroup row tag="fieldset">
                <legend className="col-form-legend">Personal data</legend>
                <FormGroup row>
                  <Label for="firstName" md={3}>First name:</Label>
                  <Col md={9}>
                    <Input type="text" name="firstName" id="firstName" placeholder="first name" />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="lastName" md={3}>Last name:</Label>
                  <Col md={9}>
                    <Input type="text" name="lastName" id="lastName" placeholder="last name" />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="patronymic" md={3}>Patronymic:</Label>
                  <Col md={9}>
                    <Input type="text" name="patronymic" id="patronymic" placeholder="patronymic" />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="dateOfBirth" md={3}>Date of birth:</Label>
                  <Col md={9}>
                    <DatePicker selected={this.state.dateOB} onChange={this.handleChange} />
                  </Col>
                </FormGroup>
              </FormGroup>

              <FormGroup row tag="fieldset">
                <legend className="col-form-legend">Address</legend>
                <FormGroup row>
                  <Col md={{size: 6, offset: 0}} xs={{size: 12, offset: 0}}>
                    <Input className="marg-bott" type="text" name="street" id="street" placeholder="street name" />
                  </Col>
                  <Col md={{size: 3, offset: 0}} xs={{size: 6, offset: 0}}>
                    <Input type="text" name="building" id="building" placeholder="building" />
                  </Col>
                  <Col md={{size: 3, offset: 0}} xs={{size: 6, offset: 0}}>
                    <Input type="text" name="appartment" id="appartment" placeholder="appartment" />
                  </Col>
                </FormGroup>
              </FormGroup>

              <FormGroup row tag="fieldset">
                <legend className="col-form-legend">Contacts</legend>
                <FormGroup row>
                  <Col md={{size: 6, offset: 0}} xs={{size: 12, offset: 0}}>
                    <Input className="marg-bott" type="text" name="email" id="email" placeholder="email" />
                  </Col>
                  <Col md={{size: 6, offset: 0}} xs={{size: 12, offset: 0}}>
                    <Input type="text" name="phone" id="phone" placeholder="phone number" />
                  </Col>
                </FormGroup>
              </FormGroup>

              <FormGroup row tag="fieldset">
                <legend className="col-form-legend">Login data</legend>
                <FormGroup row>
                  <Label for="username" md={3}>Username:</Label>
                  <Col md={9}>
                    <Input type="text" name="username" id="username" placeholder="username" />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="password" md={3}>Password:</Label>
                  <Col md={9}>
                    <Input type="password" name="password" id="password" placeholder="password" />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="password-confirm" md={3}>Confirm password:</Label>
                  <Col md={9}>
                    <Input type="password" name="password-confirm" id="password-confirm" placeholder="confirm password" />
                  </Col>
                </FormGroup>
              </FormGroup>
              <Button className="submit-btn pull-right" color="primary">Submit</Button>
            </Form>
          </div>
        </Container>
    );
  }
}

export default Registration;