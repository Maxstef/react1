import React from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, Row, Col, FormGroup, Label} from 'reactstrap';
import Validation from 'react-validation';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import {Link} from "react-router";


function renderDoctorTypes(doctorTypes) {
  return doctorTypes.map((type, index) => (
      <Type key={index} type={type}/>
  ));
}

const Type = ({type}) => {
  return (
    <div>
      <FormGroup row>
        <Label for="typeName" md={3}>Type name:</Label>
        <Col md={9}>
          <Validation.components.Input className="form-control" type="text" 
            value={type.name} name="typeName" id="typeName" placeholder="type name"
            errorClassName='is-invalid-input' validations={['required']}/>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="typeDesc" md={3}>Type description:</Label>
        <Col md={9}>
          <Validation.components.Input className="form-control" type="text" 
            value={type.description} name="typeDesc" id="typeDesc" placeholder="type description"
            errorClassName='is-invalid-input' validations={['required']}/>
        </Col>
      </FormGroup>
    </div>
  )
};

class DoctorAddEdit extends React.Component {
  
  render() {
    return (
        <div>
          <Col md={{size: 8, offset: 2}} xs={{size: 10, offset: 1}}>
            <h2>
              {this.props.doctorId === 'add' && 'Add new doctor'}
              {this.props.doctorId !== 'add' && "Doctor's info"}
            </h2>
            <Validation.components.Form onSubmit={this.props.saveDoctor}>
              <FormGroup row tag="fieldset">
                <legend className="col-form-legend">Personal data</legend>
                <FormGroup row>
                  <Label for="firstName" md={3}>First name:</Label>
                  <Col md={9}>
                    <Validation.components.Input type="text" errorClassName='is-invalid-input'
                      value={this.props.name.first} className="form-control" name="firstName" 
                      id="firstName" placeholder="first name" validations={['required', 'onlyLetters']} />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="lastName" md={3}>Last name:</Label>
                  <Col md={9}>
                    <Validation.components.Input className="form-control" type="text" 
                      value={this.props.name.last} name="lastName" id="lastName" placeholder="last name"
                      errorClassName='is-invalid-input' validations={['required', 'onlyLetters']} />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="patronymic" md={3}>Patronymic:</Label>
                  <Col md={9}>
                    <Validation.components.Input className="form-control" type="text" 
                      value={this.props.name.patronymic} name="patronymic" id="patronymic" placeholder="patronymic"
                      errorClassName='is-invalid-input' validations={['required', 'onlyLetters']}/>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="dateOfBirth" md={3}>Date of birth:</Label>
                  <Col md={9}>
                    <DatePicker  selected={this.props.info.dateOfBirth} onChange={this.props.handleDateChange} />
                  </Col>
                </FormGroup>
              </FormGroup>
              <FormGroup row tag="fieldset">
                <legend className="col-form-legend">Biography</legend>
                <Col md={12}>
                  <Validation.components.Textarea className="form-control" rows="5" style={{resize: 'none'}}
                    value={this.props.bio} name="biography" id="biography" placeholder="biography"
                    errorClassName='is-invalid-input' validations={['required']}/>
                </Col>
              </FormGroup>
              <FormGroup row tag="fieldset">
                <legend className="col-form-legend">Doctor Type</legend>
                {renderDoctorTypes(this.props.doctorType)}
              </FormGroup>
              <Validation.components.Button className="pull-right btn btn-success">Save</Validation.components.Button>
              {this.props.doctorId !== 'add' && <Button color="danger" style={{marginRight: '10px'}} className="pull-right" onClick={this.props.toggle}>Remove</Button>}
            </Validation.components.Form>
            <Link to="admin-doctors-list">Doctors list</Link>
          </Col>
          
          <Modal isOpen={this.props.modal} toggle={this.props.toggle} className="modal-sm" backdrop={this.props.backdrop}>
            <ModalHeader toggle={this.props.toggle}>Remove doctor</ModalHeader>
            <ModalBody>
              Are your sure you want to remove this doctor and all related meetings?
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.props.toggle}>Yes</Button>{' '}
              <Button color="secondary" onClick={this.props.toggle}>No</Button>
            </ModalFooter>
          </Modal>
        
        </div>
    );
  }
}

export default DoctorAddEdit;