import React from 'react';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as activeUserActions from '../../actions/active-user-action';
import { browserHistory } from "react-router";
import Cabinet from './cabinet';
import AddScheduleContainer from '../add-schedule/add-schedule-container';
import AuthoriationService from '../authorization';
import axios from 'axios';
import config from 'react-global-configuration';

class CabinetContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            uploaderDispalay: false
        };
        this.toggleUploader = this.toggleUploader.bind(this);
        this.savePhoto = this.savePhoto.bind(this);
    }

    toggleUploader(){
        this.setState({uploaderDispalay: !this.state.uploaderDispalay});
    }

    componentDidMount() {
        if (this.props.role !== 'doctor') {
            browserHistory.replace('/home');
        }
    }

    savePhoto(photoUrl){
        axios.put(config.get('api') + 'doctors/' + this.props.user._id, { photoUrl: photoUrl })
            .then(res => {
                console.log(res.data);
                this.toggleUploader();
                let user = this.props.user;
                user.photoUrl = res.data.photoUrl;
                this.props.setInfo(user);
            });
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
                <Cabinet 
                    toggleUploader={this.toggleUploader}
                    uploaderDispalay={this.state.uploaderDispalay}
                    user={this.props.user}
                    savePhoto={this.savePhoto}/>
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