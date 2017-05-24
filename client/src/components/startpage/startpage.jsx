import React from 'react';
import {Container} from 'reactstrap';
import {Link} from "react-router";
import moment from "moment";


class StartPage extends React.Component {
  
  render() {
    return (
        <div>
          <div className="image-container">
            <h2 className="title">the clinic</h2>
          </div>
          <Container>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce mi lorem, congue ac ligula a, pretium
              pharetra erat. Nam interdum a erat non vehicula. Morbi eu ipsum nec ligula maximus commodo nec laoreet
              odio. Integer vehicula enim turpis. Vestibulum nec lorem rutrum, faucibus erat et, sagittis tellus. Proin
              mollis, libero sed molestie mollis, felis tortor consectetur enim, id viverra dui erat et dolor. Aliquam
              tempus leo justo, eget rutrum urna euismod id. Proin purus dolor, porta at molestie in, mattis eu ipsum.
              Donec in eros lectus. Fusce nec nisi nec dui luctus varius. In ullamcorper scelerisque libero vitae
              dapibus.</p>
            <p>Duis ultricies facilisis aliquet. Pellentesque cursus nulla quis ante elementum, sed convallis arcu
              eleifend. Etiam quis aliquam quam. Phasellus tempor et ligula tempor suscipit. Vivamus quis risus
              venenatis, egestas velit ac, viverra odio. Cras massa lacus, posuere semper porttitor in, euismod quis
              magna. Ut tincidunt mi id augue dapibus, ut tempor justo aliquam. Cras sed arcu metus. Aliquam quis tortor
              at sapien imperdiet volutpat id viverra erat. Aenean eget neque eget risus euismod congue. Maecenas id est
              at quam vehicula rutrum varius at risus.</p>
            <p>Donec lobortis erat porta turpis mollis hendrerit. Nullam varius ante id molestie egestas. Ut id odio
              malesuada, eleifend dui non, sodales justo. Praesent lobortis velit purus, a malesuada lectus lobortis
              nec. Donec bibendum sagittis arcu vel volutpat. Vivamus at enim dapibus, tristique tellus in, iaculis
              risus. Quisque consequat mauris ac risus fermentum, sed pulvinar nisi venenatis. In hac habitasse platea
              dictumst. Donec eu massa at libero blandit tristique. Nulla ultricies, sem sollicitudin vulputate ornare,
              magna magna lobortis nibh, sit amet eleifend odio ipsum id elit. Nulla scelerisque iaculis ligula, quis
              dignissim risus consectetur non. Aenean euismod neque eu quam tincidunt ornare. Aliquam at porttitor
              purus, a pulvinar urna.</p>
          </Container>
        </div>
    );
  }
}

export default StartPage;