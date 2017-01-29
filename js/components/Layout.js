import React from 'react';

import Navigation from './Layout/Navigation'

export default class Layout extends React.Component {
  navigate() {
    this.props.history.replaceState(null, "/portfolio");
  }

  render() {
    return (
      <div className="layout">
        <Navigation />
        <div className="content">
        </div>
      </div>
    )
  }
}
