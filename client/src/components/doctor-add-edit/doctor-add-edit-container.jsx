import React from 'react';
import axios from 'axios';
import moment from 'moment';
import DoctorAddEdit from './doctor-add-edit';
import Validation from 'react-validation';
import validator from 'validator';


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

class DoctorAddEditContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newPassword: false,
      modal: false,
      backdrop: "static",
      info: {
        dateOfBirth: moment(),
        password: "",
        username : ""
      },
      name: {
        first: '',
        last: '',
        patronymic: ''
      },
      doctorType: [{
        name: '',
        description: ''
      }],
      bio: ""
    };
    this.toggle = this.toggle.bind(this);
    this.saveDoctor = this.saveDoctor.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.toggleNewPassword = this.toggleNewPassword.bind(this);
    this.newDoctorType = this.newDoctorType.bind(this);
    this.removeDoctorType = this.removeDoctorType.bind(this);
    this.setDoctorType = this.setDoctorType.bind(this);
  };
  
  componentDidMount() {
    if(this.props.routeParams.doctorId !== 'add'){
      let t = this;
      axios.get('http://localhost:3000/users/' + this.props.routeParams.doctorId)
         .then(res => {
           console.log(res);
           let info = res.data;
           info.dateOfBirth = moment(res.data.dateOfBirth);
           let name = res.data.name;
           let doctorType = res.data.doctorData.doctorType;
           let bio = res.data.doctorData.bio;
           this.setState({info, name, doctorType, bio});
         });
    }
  }

  saveDoctor(e){
    e.preventDefault();
    console.log(e.target);
    if(this.state.info._id){
      console.log('update');
    } else {
       console.log('post');
    }
  }

  handleDateChange(date){
    let info = this.state.info;
    info.dateOfBirth = moment(date);
    this.setState({info});
  }

  toggleNewPassword(){
    console.log('here');
    this.setState({
      newPassword: !this.state.newPassword
    });
  }
  
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
    console.log(this.state.info._id, this.state.name, this.state.description);
  }

  setDoctorType(value, index, key){
    console.log(value, index, key);
    this.state.doctorType[index][key] = value;
    this.setState({doctorType: this.state.doctorType});
  }

  removeDoctorType(index){
    console.log(index);
    let removed = this.state.doctorType.splice(index, 1);
    console.log(removed);
    this.setState({doctorType: this.state.doctorType});
    console.log(this.state.doctorType);
  }

  newDoctorType(){
    this.setState({doctorType: this.state.doctorType.concat({
      name: '',
      description: ''})
    });
    console.log(this.state.doctorType);
  }
  
  render() {
    return (
        <DoctorAddEdit modal={this.state.modal}
                       newPassword={this.state.newPassword}
                       handleDateChange={this.handleDateChange}
                       toggleNewPassword={this.toggleNewPassword}
                       setDoctorType={this.setDoctorType}
                       newDoctorType={this.newDoctorType}
                       removeDoctorType={this.removeDoctorType}
                       saveDoctor={this.saveDoctor}
                       backdrop={this.state.backdrop}
                       info={this.state.info}
                       name={this.state.name}
                       bio={this.state.bio}
                       doctorType={this.state.doctorType}
                       toggle={this.toggle}
                       doctorId={this.props.params.doctorId}/>
    )
  }
}

export default DoctorAddEditContainer;