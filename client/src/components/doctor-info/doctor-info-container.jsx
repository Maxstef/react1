import React from 'react';
import axios from 'axios';
import DoctorInfo from './doctor-info';
import { connect } from 'react-redux';

class DoctorInfoContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      backdrop: "static",
      info: {},
      name: {},
      doctorType: {}
    };
    this.toggle = this.toggle.bind(this);
  };
  
  componentDidMount() {
    axios.get('http://localhost:3000/doctors')
         .then(res => {
           let info = res.data[0];
           let name = res.data[0].name;
           let doctorType = res.data[0].doctorData.doctorType[0];
           this.setState({info, name, doctorType});
         });
  }
  
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
    console.log(this.state.info._id, this.state.name, this.state.description);
  }
  
  render() {
    return (
        <DoctorInfo modal={this.state.modal}
                    backdrop={this.state.backdrop}
                    info={this.state.info}
                    name={this.state.name}
                    doctorType={this.state.doctorType}
                    toggle={this.toggle}
                    doctorId={this.props.params.doctorId}/>
    )
  }
}

export default DoctorInfoContainer;