import React from 'react';
import { Container } from 'reactstrap';
import { Link } from "react-router";
import ImagesUploader from 'react-images-uploader';
import config from 'react-global-configuration';
import AvatarImageCropper from 'react-avatar-image-cropper';

class Cabinet extends React.Component {
    render() {
        return (
            <Container>
                <div className="cabinet">
                    <h3>This is a cabinet</h3>
                </div>
                {(this.props.user && (this.props.user.photoUrl === null || typeof this.props.user.photoUrl == 'undefined')) && 
                    <div>
                        <img src={config.get('defaultAvatarUrl')} width="200"/>
                    </div>
                }
                {(this.props.user && (this.props.user.photoUrl !== null && typeof this.props.user.photoUrl != 'undefined')) && 
                    <div>
                        <img src={config.get('api') + this.props.user.photoUrl} width="200"/>
                    </div>
                }
                {!this.props.uploaderDispalay && 
                    <div className="back-link" onClick={this.props.toggleUploader}>change photo</div>
                }
                {this.props.uploaderDispalay && 
                    <ImagesUploader
                        url="http://localhost:3000/upload-photo"
                        optimisticPreviews
                        multiple={false}
                        onLoadEnd={(err, response) => {
                            let res;
                            if (err && err.message != 'invalid response type') {
                                console.error(err);
                            } else if (err.message == 'invalid response type'){
                                res = err.response;
                            } else {
                                res = response;
                            }
                            this.props.savePhoto(res.fileName);
                            console.log(res);
                        }}
                        label="Upload a picture"
                    />
                } 

                {(this.props.user && (this.props.user.photoUrl === null || typeof this.props.user.photoUrl == 'undefined')) && 
                    <div style={{ width: '250px', height: '250px', margin: 'auto', border: '1px solid black'}}>
                        <AvatarImageCropper apply={this.props.apply} />
                    </div>
                }
                {(this.props.user && (this.props.user.photoUrl !== null && typeof this.props.user.photoUrl != 'undefined')) && 
                    <div style={{ width: '250px', height: '250px', margin: 'auto', border: '1px solid black' }}>
                        <AvatarImageCropper apply={this.props.apply} />
                    </div>
                }
                
                
            </Container>
        );
    }
}

export default Cabinet;