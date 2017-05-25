import React from 'react';
import {Container} from 'reactstrap';
import {Link} from "react-router";
import moment from "moment";

function renderMeetings(currentMeetings) {
  return currentMeetings.map((meeting, index) => (
      <Meetings key={index} meeting={meeting}/>
  ));
}

const Meetings = ({meeting}) => {
  return (
      <div className="container">
        <div className="row">
          <div className="col-xs-10">
            <p>
              {meeting.doctor.name.first}{' '}
              {meeting.doctor.name.last}{' '}
              {moment(meeting.date).format('DD MMM YYYY, dddd, hh:mm')}
            </p>
          </div>
        </div>
      </div>
  )
};

class Home extends React.Component {
  
  render() {
    const meetings = renderMeetings(this.props.currentMeetings);
    const pastMeetings = renderMeetings(this.props.meetingsInPast);
    return (
        <Container>
          <div className="homepage">
            {(this.props.role == 'patient' || this.props.role == 'admin') &&
            <Link to="doctors-list">to doctors list</Link>}
            <h4>Your appointments</h4>
            {(this.props.currentMeetings.length || this.props.meetingsInPast.length) && <div>
              {/*<div className="row">*/}
                {/*<div className="col-6 col-md-4 col-md-offset-2">*/}
                  <button className={"btn btn-secondary current-meetings-btn " + (this.props.togglerCurrent ? 'active' : '')}
                          onClick={this.props.toggleCurrent}>
                    Current meetings
                  </button>
                {/*</div>*/}
                {/*<div className="col-6 col-md-4">*/}
                  <button className={"btn btn-secondary past-meetings-btn " + (this.props.togglerPast ? 'active' : '')}
                          onClick={this.props.togglePast}>
                    Past meetings
                  </button>
              {/*//   </div>*/}
              {/*// </div>*/}
              {this.props.togglerCurrent && <div>{meetings}</div>}
              {this.props.togglerPast && <div>{pastMeetings}</div>}
            </div>}
          </div>
        </Container>
    );
  }
}

export default Home;