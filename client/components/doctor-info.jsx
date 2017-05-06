import React from 'react';

class DoctorInfo extends React.Component {
  render() {
    return (
        <div className="search">
          <header className="search-header">Doctor info #{this.props.params.doctorId}</header>
          <div className="results">
            {this.props.children}
          </div>
          <div className="search-footer pagination"></div>
        </div>
    );
  }
}

export default DoctorInfo;