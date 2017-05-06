import React from 'react';

class Container extends React.Component {
  render() {
    return (
        <div className="app">
          <header className="primary-header">container</header>
          <aside className="primary-aside"></aside>
          <main>
            {this.props.children}
          </main>
        </div>
    );
  }
}

export default Container;