import React from 'react';
import axios from 'axios';
import StartPage from './startpage';
import {connect} from 'react-redux';
import config from "react-global-configuration";
import {bindActionCreators} from "redux";
import AuthoriationService from '../authorization';
import * as activeUserActions from '../../actions/active-user-action';
import moment from "moment";
import * as _ from "lodash";

class StartPageContainer extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
    
    };
  }
  
  componentWillMount() {
  }
  
  render() {
    return (
        <div>
          <AuthoriationService/>
          <StartPage/>
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    role: state.activeUser.role,
    info: state.activeUser.info
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setInfo: bindActionCreators(activeUserActions.setUserInfo, dispatch),
    setRole: bindActionCreators(activeUserActions.setRole, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StartPageContainer);