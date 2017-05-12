import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {bindActionCreators} from "redux";
import * as doctorsActions from '../actions/doctors-action';



class HttpService extends React.Component {
  render() {
    return null;
  }
  
  getAllDoctors() {
    axios.get('http://localhost:3000/doctors')
         .then(res => {
           console.log('http service get!!!!1', this.props.listEmpty);
           this.props.setInfo(res.data);
         });
  }
  
  componentWillMount() {
    if (this.props.listEmpty || true) {
      this.getAllDoctors();
    } else {
      console.log('list is not empty');
    }
  }
}


function mapStateToProps (state) {
  return {
    listEmpty: state.doctors.listEmpty,
    info: state.doctors.info
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setInfo: bindActionCreators(doctorsActions.setInfo, dispatch),
    setListEmpty: bindActionCreators(doctorsActions.listEmpty, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HttpService);

