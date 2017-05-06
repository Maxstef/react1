import React from 'react';

class Content extends React.Component {
  render() {
    return (
        <div className="search">
          <header className="search-header">Content</header>
          <div className="results">
            {this.props.children}
          </div>
          <div className="search-footer pagination">123</div>
        </div>
    );
  }
}

export default Content;