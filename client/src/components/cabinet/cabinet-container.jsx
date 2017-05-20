import React from 'react';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as activeUserActions from '../../actions/active-user-action';
import { browserHistory } from "react-router";
import Cabinet from './cabinet';
import AddScheduleContainer from '../add-schedule/add-schedule-container';
import AuthoriationService from '../authorization';

class CabinetContainer extends React.Component {

    componentDidMount() {
        if (this.props.role !== 'doctor') {
            browserHistory.replace('/home');
        }
    }
    render() {
        return (
            <Container>
                <AuthoriationService/>
                {(this.props.user && (typeof this.props.user.doctorData.available == 'undefined' || this.props.user.doctorData.available === null)) &&
                    <div>
                        <h5>You didn't specify your schedule. Do it for patients can make meeting with you.</h5>
                        <AddScheduleContainer />
                    </div>
                }
                <Cabinet />
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        role: state.activeUser.role,
        user: state.activeUser.info
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setInfo: bindActionCreators(activeUserActions.setUserInfo, dispatch),
        setRole: bindActionCreators(activeUserActions.setRole, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CabinetContainer);