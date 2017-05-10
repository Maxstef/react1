import React from 'react';
import axios from 'axios';
import DoctorsList from './doctors-list';

class DoctorsListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: []
    };
  };
  
  componentDidMount() {
    axios.get('http://localhost:3000/doctors')
         .then(res => {
           let info = res.data;
           this.setState({info});
           // console.log(info[0]);
         });
  }
  
  render() {
    return (
        <DoctorsList info={this.state.info} />
    );
  }
}

export default DoctorsListContainer;