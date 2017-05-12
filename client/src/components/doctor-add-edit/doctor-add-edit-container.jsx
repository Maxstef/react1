import React from 'react';
import axios from 'axios';
import moment from 'moment';
import DoctorAddEdit from './doctor-add-edit';
import config from 'react-global-configuration';

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
    console.log(config.get('api'));
    if(this.props.routeParams.doctorId !== 'add'){
      let t = this;
      axios.get(config.get('api') + 'users/' + this.props.routeParams.doctorId)
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
    this.setState({
      newPassword: !this.state.newPassword
    });
  }
  
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  setDoctorType(value, index, key){
    this.state.doctorType[index][key] = value;
    this.setState({doctorType: this.state.doctorType});
  }

  removeDoctorType(index){
    let removed = this.state.doctorType.splice(index, 1);
    this.setState({doctorType: this.state.doctorType});
  }

  newDoctorType(){
    this.setState({doctorType: this.state.doctorType.concat({
      name: '',
      description: ''})
    });
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