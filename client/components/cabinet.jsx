import React from 'react';
import {Container} from 'reactstrap';
import {Link} from "react-router";

class Cabinet extends React.Component {
  render() {
    return (
        <Container>
          <div className="cabinet">
            <h3>This is a cabinet</h3>
          </div>
        </Container>
    );
  }
}

export default Cabinet;