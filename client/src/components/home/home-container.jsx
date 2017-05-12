import React from 'react';
import axios from 'axios';
import Home from './home';
import { connect } from 'react-redux';
import {bindActionCreators} from "redux";
import AuthoriationService from '../authorization';
import * as activeUserActions from '../../actions/active-user-action';

class HomeContainer extends React.Component {

    constructor (props) {
        super(props)
        this.state = {

        };
    }

    render() {
        return (
            <div className="name">
                <AuthoriationService/>
                <Home role={this.props.role}></Home>
            </div>
        );
    }
}

function mapStateToProps (state) {
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);