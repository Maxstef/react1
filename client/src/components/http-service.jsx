import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as doctorsActions from '../actions/doctors-action';
import config from 'react-global-configuration';



class HttpService extends React.Component {
  render() {
    return null;
  }

  getAllDoctors() {
    axios.get(config.get('api') + 'doctors')
      .then(res => {
        console.log('http service get!!!!1', this.props.listEmpty);
        this.props.setInfo(res.data);
        this.props.setListEmpty(false);
      });
  }

  componentWillMount() {
    if (this.props.listEmpty) {
      this.getAllDoctors();
    } else {
      console.log('list is not empty');
    }
  }
}


function mapStateToProps(state) {
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

