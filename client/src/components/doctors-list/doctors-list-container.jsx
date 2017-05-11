import React from 'react';
import DoctorsList from './doctors-list';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import * as doctorsActions from '../../actions/doctors-action';
import HttpService from '../http-service';


class DoctorsListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: []
    };
  };
  
  render() {
    return (
        <div>
          <HttpService/>
          <DoctorsList info={this.props.info}/>
        </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    info: state.doctors.info,
    listEmpty: state.doctors.listEmpty
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setListEmpty: bindActionCreators(doctorsActions.listEmpty, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorsListContainer);